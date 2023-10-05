import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import filter from "../img/filter-icons.png";
import { OpenRoute } from "../utility/ApiServices";
import download from "../img/download.jpg";
import {
  faXmark,
  faMagnifyingGlass,
  faSort,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import Rating from "../components/Rating";
import DiscoverSidebar from "../components/DiscoverSidebar";
import NoSubscriptin from "../img/Subscription-Not-Found-Monster.png";
import { useSelector } from "react-redux";
import axios from "axios";
import LoadingSpinner from "../components/Spinner";
import CardModal from "../components/CardModal";
import { useAuth } from "../services/auth";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const Discover = () => {
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const [DiscoverSideBar, setDiscoverSideBar] = useState(false);
  const [isListView, setIsListView] = useState(true);
  const [loading, setLoading] = useState(false);
  let [subscription, setSubscription] = useState([]);
  let [sortedSubscription, setsortedSubscription] = useState([]);
  const [reload, setReload] = useState(true);
  const [sortOrder, setSortOrder] = useState("asc");
  const [favorite, setFavorite] = useState([]);
  const [currentCategory, setCurrentCategory] = useState();
  const [currentCategorySubCat, setCurrentCategorySubCat] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items per page
  const totalPages = Math.ceil(subscription?.length / itemsPerPage);
  // Calculate starting and ending indexes for displayed data
  // const startIndex = (currentPage - 1) * itemsPerPage;
  // const endIndex = Math.min(startIndex + itemsPerPage, subscription?.length);
  // subscription = subscription?.slice(startIndex, endIndex);
  const { register, handleSubmit, formState, reset } = useForm();
  const { errors } = formState;
  const categories = useSelector((state) => state.category);

  const handleSideBar = () => {
    // console.log("sidebar is clicked");
    setDiscoverSideBar(!DiscoverSideBar);
  };

  const handleListCardView = () => {
    setIsListView(!isListView);
  };

  // console.log("current catehory", currentCategory);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const sortData = (sortBy) => {
    // Toggle the sorting order when the button is clicked
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);

    // Clone the subscription array
    const clonedSubscription = [...subscription];

    // Sort the cloned array based on the sortBy parameter and the new sorting order
    clonedSubscription.sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case "subscriptionName":
          comparison = a.subscriptionName.localeCompare(b.subscriptionName);
          break;

        case "freeTrial":
          const aFreeTrial = a.freeTrial || "";
          const bFreeTrial = b.freeTrial || "";
          comparison = aFreeTrial.localeCompare(bFreeTrial);
          break;

        case "premiumSubscriptionsFrom":
          const priceA =
            parseFloat(
              extractNumberFromSubscription(a.premiumSubscriptionsFrom)
            ) || 0;
          const priceB =
            parseFloat(
              extractNumberFromSubscription(b.premiumSubscriptionsFrom)
            ) || 0;
          comparison = priceA - priceB;
          break;

        case "rating":
          const ratA = parseFloat(a.rating) || 0;
          const ratB = parseFloat(b.rating) || 0;
          comparison = ratA - ratB;
          break;

        default:
          comparison = 0;
      }

      // Apply sorting order (ascending or descending)
      return newSortOrder === "desc" ? comparison * -1 : comparison;
    });

    // Update both sortedSubscription and subscription states
    setsortedSubscription(clonedSubscription);
    setSubscription(clonedSubscription);

    // Reset current page to 1
    setCurrentPage(1);
  };

  // Calculate starting and ending indexes for displayed data
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, subscription?.length);
  const slicedSubscription = subscription?.slice(startIndex, endIndex);

  // Use slicedSubscription for rendering

  const getFilter = (key, values) => {
    setCurrentCategorySubCat();
    setCurrentCategory(values);
    setCurrentPage(1);
    setLoading(true);
    OpenRoute.filter({
      key: key,
      value: values,
    })
      .then((response) => {
        let sub = response.data.subscriptions;
        setSubscription(sub);
      })
      .catch((error) => {
        console.log(error.message);
        toast.error("Something went Wrong");
      })
      .finally(() => {
        // console.log(subscription);
        setLoading(false);
      });
  };

  const searchFilter = (data, e) => {
    setCurrentCategory();
    setCurrentPage(1);
    e.preventDefault();
    setLoading(true);
    OpenRoute.filter({
      key: "name",
      value: data.searchInput,
    })
      .then((response) => {
        let sub = response.data.subscriptions;
        // console.log(sub);
        if (sub.length <= 0) {
          toast.warning("No Subscription Found With This keywords");
        }
        setSubscription(sub);
      })
      .catch((error) => {
        console.log(error.message);
      })
      .finally(() => {
        setLoading(false);
        reset();
        // console.log(subscription);
      });
  };

  const AllSubscription = () => {
    setLoading(true);
    let config = {
      method: "get",
      maxBodyLength: Infinity,

      url: `${process.env.REACT_APP_global_url}/api/get-subscriptions?sort=Most Popular`,
    };
    axios
      .request(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data.subscriptions));
        setSubscription(response.data.subscriptions);
        // console.log(response.data.subscriptions);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something Went wrong");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const extractNumberFromSubscription = (subscriptionName) => {
    const extractedNumber = parseFloat(
      subscriptionName?.replace(/[^0-9.-]+/g, "")
    );
    return isNaN(extractedNumber) ? "N/A" : extractedNumber; // Handle cases where extraction fails
  };

  const addFavorite = (name) => {
    if (!user?.user_id) {
      navigate("/login"); // Navigate to the login page
      return; // Stop further execution
    }
    setLoading(true);
    let data = JSON.stringify({
      subscription_name: name,
      user_id: user?.user_id,
    });
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_global_url}/api/user/favorite`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        if (response.data.message === "Favorite deleted successfully") {
          GetFavorite();
          return toast.warning(response.data.message);
        }
        GetFavorite();
        return toast.success(response.data.message);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const GetFavorite = () => {
    setLoading(true);
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_global_url}/api/user/get-favorite`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .request(config)
      .then((response) => {
        // console.log(response.data.subscriptions);
        setFavorite(response.data.subscriptions);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  function getImageUrlByCategoryName(categoryName) {
    const cat = categories.find((category) => category.name === categoryName);
    // console.log(cat);

    let catrUrl = `${process.env.REACT_APP_global_url}/public/${cat?.image}`;
    return cat ? catrUrl : download;
  }
  useEffect(() => {
    if (token) {
      GetFavorite();
    }
  }, []);
  useEffect(() => {
    setCurrentCategory();
    AllSubscription();
  }, [reload]);
  return (
    <div className="discover-bg">
      <Navbar />
      <div className="wishListLoder">
        <LoadingSpinner loading={loading} />
      </div>
      <div className="app-sidebar__overlay" data-toggle="sidebar"></div>
      <DiscoverSidebar
        DiscoverSideBar={DiscoverSideBar}
        handleSideBar={handleSideBar}
        setSubscription={setSubscription}
        currentCategory={currentCategory}
        setLoading={setLoading}
        setCurrentCategory={setCurrentCategory}
        setCurrentCategorySubCat={setCurrentCategorySubCat}
      />
      <main className="app-content ">
        <section className="mob-filters ">
          <div className=" row justify-content-center">
            <div className="col-sm-12  d-lg-none mt-4 text-center">
              <span
                className="discover-filter-btn"
                onClick={handleSideBar}
                style={{ cursor: "pointer" }}
              >
                <img
                  className="filter-icon w-30px pb-1 mx-2"
                  src={filter}
                  alt="loading"
                />
                Filters
              </span>
            </div>
          </div>
        </section>
        {/* <!-- main body section start from here --> */}
        {/* <!-- ::profile deatils --> */}
        <section className="profile-setings mt-5">
          <div className="row justify-content-center">
            <div className="col-md-12 selection-col">
              <div className="row justify-content-center">
                <div className="col-md-10">
                  <div className="cst-main-heading">
                    <h2>Subdefy Discover</h2>
                    <div>
                      <p>
                        Welcome to Subdefy Discover, your personal dashboard to
                        the world of <br /> subscription services. Browse our
                        comprehensive display of recurring expenses, <br />{" "}
                        compare options, and pinpoint the subscription that
                        delivers the best value for you.{" "}
                      </p>
                      <div className="col-md-2 list__card__view__button">
                        <div className="tab">
                          <div className="form_tab  ">
                            <div>VIEW</div>
                            <ul className="nav nav-tabs nav-justified">
                              <li
                                className="nav-item"
                                onClick={handleListCardView}
                              >
                                <span
                                  className="nav-link rahul active"
                                  data-bs-toggle="tab"
                                  // href="#c1"
                                >
                                  List
                                </span>
                              </li>
                              <li
                                className="nav-item "
                                onClick={handleListCardView}
                              >
                                <span
                                  className="nav-link rahul"
                                  data-bs-toggle="tab"
                                  // href="#c2"
                                >
                                  Card
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <!--:: form-search-bar  --> */}
                  <form
                    className="search-bar-wrapper mt-4"
                    onSubmit={handleSubmit(searchFilter)}
                  >
                    <div className="search-from-div">
                      <label htmlFor="searchInput">
                        <input
                          id="searchInput"
                          type="text"
                          placeholder="search category, name or keywords"
                          className="search-input-my"
                          {...register("searchInput")}
                        />
                      </label>

                      <button
                        type="submit"
                        className="search-button "
                        // onClick={() => alert("button is clicked")}
                        // style={{ backgroundColor: "red", zIndex: 99999999 }}
                      >
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="card-list-discover">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-10 mt-5">
                <div className="list card-list">
                  <div className="discover-card-list d-flex">
                    {/* <!-- :: card 1 --> */}

                    {categories?.map((cat, index) => (
                      <div className={`d-card text-center `} key={index}>
                        <div
                          className={`card-info cat_${index} ${
                            currentCategory === cat.name
                              ? "active-category"
                              : ""
                          }`}
                          style={{ cursor: "pointer" }}
                          onClick={() => getFilter("category_name", cat?.name)}
                        >
                          <div className="card-avatar">
                            <img
                              className="d-card-icon w-100"
                              src={`${process.env.REACT_APP_global_url}/public/${cat?.image}`}
                              alt="load"
                            />
                          </div>
                          <div className="card-subtitle pt-2">
                            <p>{cat.name}</p>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* <!-- :: card 2 --> */}
                    {/* <!-- Add other cards similarly --> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* <!-- table section  --> */}
        {isListView ? (
          <section className="discover-list-section mt-5">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-md-11">
                  <h6>
                    {currentCategory}{" "}
                    {currentCategorySubCat ? `- ${currentCategorySubCat}` : ""}
                  </h6>

                  <div className="table-container discover-table w-nowrap">
                    <div className="table-responsive">
                      <table className="table">
                        <thead className="text-center">
                          <tr>
                            <th className="text-left br-none px-4 ">
                              Service
                              <span
                                className="sort-btn"
                                onClick={() => sortData("subscriptionName")}
                              >
                                <FontAwesomeIcon
                                  icon={faSort}
                                  className="mx-2 clearFilter"
                                />
                              </span>
                            </th>
                            <th className="br-none">
                              Rating
                              <span
                                className="sort-btn"
                                onClick={() => {
                                  sortData("rating");
                                }}
                              >
                                <FontAwesomeIcon
                                  icon={faSort}
                                  className="mx-2 clearFilter"
                                />
                              </span>
                            </th>
                            {/* <!-- <th><img className="w-35px table-fam-head" src="img/family.png" alt="Family"></th><th><img className="w-35px table-fam-head" src="img/lcd.png" alt="LCD"></th> --> */}
                            <th className="br-none">
                              Free Trial?
                              <span
                                className="sort-btn"
                                onClick={() => sortData("freeTrial")}
                              >
                                <FontAwesomeIcon
                                  icon={faSort}
                                  className="mx-2 clearFilter"
                                />
                              </span>
                            </th>
                            <th className="text-left br-none px-4">
                              from $
                              <span
                                className="sort-btn "
                                onClick={() => {
                                  sortData("premiumSubscriptionsFrom");
                                }}
                              >
                                <FontAwesomeIcon
                                  icon={faSort}
                                  className="mx-2 clearFilter"
                                />
                              </span>
                            </th>
                            {/* <!-- <th className="br-none">Ads</th> --> */}
                            <th className="br-none">
                              {/* <img
                              src={ClearFilter}
                              alt="filter"
                              colSpan="2"
                              className="clearFilter"
                              style={{
                                width: "23px",
                                cursor: "pointer",
                              }}
                              onClick={() => setReload(!reload)}
                              // onMouseOver="ClearFilter"
                            /> */}
                              <span
                                className="clearFilter"
                                onClick={() => {
                                  setCurrentCategorySubCat();
                                  setReload(!reload);
                                }}
                                style={{
                                  width: "23px",
                                  cursor: "pointer",
                                }}
                              >
                                Clear All Filters
                              </span>
                            </th>
                            <th className="br-none"></th>
                          </tr>
                        </thead>
                        <tbody className="text-center">
                          {/* <!-- row01 --> */}
                          {/* subscription?.length > 0 */}
                          {subscription?.length > 0 ? (
                            slicedSubscription?.map((sub, index) => (
                              <tr
                                className="v-middle   dt-drop-shadow"
                                key={index}
                              >
                                <td className="br-rad-left bg-white cst-mg-icon-pd">
                                  <div className="service-contain">
                                    <label className="container-label-text">
                                      <div className="image-box">
                                        {sub.logURL === "TBA"}
                                        <img
                                          className="icon-customer rounded-circle"
                                          src={
                                            sub?.logoURL
                                              ? sub?.logoURL === "TBA"
                                                ? getImageUrlByCategoryName(
                                                    sub?.category
                                                  )
                                                : sub?.logoURL
                                              : getImageUrlByCategoryName(
                                                  sub?.category
                                                )
                                          }
                                          alt="Disney"
                                        />
                                      </div>
                                      <span className="fixed-number text-left">
                                        <h6>{sub.subscriptionName}</h6>
                                        <span className="text-description text-wrap d-inline-block">
                                          {sub?.subscriptionDescriptionShort}
                                        </span>
                                      </span>
                                    </label>
                                  </div>
                                </td>
                                <td className="bg-white star-icons">
                                  {/* {sub?.rating || 0} */}
                                  {/* <ReactStars
                                  size={18}
                                  count={5}
                                  color={"#212529"}
                                  activeColor={"orange"}
                                  value={sub?.rating}
                                  edit={false}
                                  isHalf={true}
                                  emptyIcon={<FaRegStar />}
                                  halfIcon={<FaStarHalfAlt />}
                                  filledIcon={<FaStar />}
                                /> */}
                                  <Rating
                                    value={parseFloat(sub?.rating) || 0}
                                  ></Rating>
                                </td>

                                <td className="user-free-trail text-center bg-white">
                                  {sub.freeTrial === "Yes" ? (
                                    <FontAwesomeIcon icon={faCheck} />
                                  ) : (
                                    <FontAwesomeIcon icon={faXmark} />
                                  )}
                                </td>
                                <td className="bg-white">
                                  <div className="rate d-flex justify-content-center">
                                    <h5 className="pt-2">
                                      $
                                      {extractNumberFromSubscription(
                                        sub.premiumSubscriptionsFrom
                                      )}
                                    </h5>
                                    {/* <span className="discount-text ml-3 pt-2">
                                    Save 5%
                                  </span> */}
                                  </div>
                                </td>

                                <td className="bg-white">
                                  <Link
                                    to={`/service/${sub?.subscriptionName}`}
                                    className="btn-primary btn-more-info"
                                  >
                                    More Info
                                  </Link>
                                </td>

                                <td className="fav-things br-rad-right bg-white">
                                  {/* {favorite?.includes(sub?.subscriptionName)} */}
                                  <div
                                    className="con-like"
                                    onClick={() =>
                                      addFavorite(sub?.subscriptionName)
                                    }
                                  >
                                    <label
                                      htmlFor="like"
                                      style={{
                                        display: "unset",
                                      }}
                                    >
                                      <input
                                        title="like"
                                        type="checkbox"
                                        className="like"
                                        // defaultChecked={true}
                                        // defaultChecked={favorite.some((som) => {
                                        //   return som.subscription_name.includes(
                                        //     sub.subscriptionName
                                        //   );
                                        // })}
                                      />
                                    </label>

                                    <div className="checkmark">
                                      {favorite.some((som) => {
                                        return som.subscription_name.includes(
                                          sub.subscriptionName
                                        );
                                      }) ? (
                                        <svg
                                          viewBox="0 0 24 24"
                                          className="filled"
                                          xmlns="https://www.w3.org/2000/svg"
                                        >
                                          <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"></path>
                                        </svg>
                                      ) : (
                                        <svg
                                          viewBox="0 0 24 24"
                                          className="outline"
                                          xmlns="https://www.w3.org/2000/svg"
                                        >
                                          <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z"></path>
                                        </svg>
                                      )}
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="7" className="text-center border-0">
                                <img
                                  src={NoSubscriptin}
                                  alt="no data"
                                  style={{
                                    height: "50vh",
                                  }}
                                />
                              </td>
                            </tr>
                          )}
                          {/* <!-- row 02 --> */}
                        </tbody>
                      </table>
                      {subscription?.length <= 5 ? (
                        ""
                      ) : (
                        <div className="pagination">
                          <div>
                            <button
                              className="pagination-prev"
                              onClick={() => handlePageChange(currentPage - 1)}
                              disabled={currentPage === 1}
                            >
                              &#60;&#60; Prev
                            </button>
                            {Array.from({ length: totalPages }, (_, i) => {
                              // Only render 3 pages indices around the current page
                              if (
                                i + 1 === currentPage || // Current page
                                i + 1 === currentPage - 1 || // Page before current page
                                i + 1 === currentPage + 1 // Page after current page
                              ) {
                                return (
                                  <button
                                    key={i + 1}
                                    className={`pagination-link ${
                                      i + 1 === currentPage ? "active" : ""
                                    }`}
                                    onClick={() => handlePageChange(i + 1)}
                                  >
                                    {i + 1}
                                  </button>
                                );
                              } else if (
                                i === 1 &&
                                currentPage > 3 // Insert an ellipsis button before the first page
                              ) {
                                return (
                                  <span
                                    style={{ marginLeft: "5px" }}
                                    key="ellipsis-start"
                                    className="pagination-ellipsis"
                                  >
                                    ...
                                  </span>
                                );
                              } else if (
                                i === totalPages - 2 &&
                                currentPage < totalPages - 2 // Insert an ellipsis button after the last page
                              ) {
                                return (
                                  <span
                                    style={{ marginRight: "4px" }}
                                    key="ellipsis-end"
                                    className="pagination-ellipsis"
                                  >
                                    ...
                                  </span>
                                );
                              }
                              return null; // For indices that are not rendered
                            })}
                            <button
                              className="pagination-next"
                              onClick={() => handlePageChange(currentPage + 1)}
                              disabled={currentPage === totalPages}
                            >
                              Next &#62;&#62;
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <section className="card-list-discover">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-md-10 mt-5">
                  <h6>
                    {currentCategory}{" "}
                    {currentCategorySubCat ? `- ${currentCategorySubCat}` : ""}
                  </h6>
                  <div className="list card-list">
                    <div className="discover-card-list d-flex">
                      <CardModal
                        subscription={subscription}
                        favorite={favorite}
                        addFavorite={addFavorite}
                        categories={categories}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Discover;

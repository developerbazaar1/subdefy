import { faCheck, faSort, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SideBar from "./SideBar";
import axios from "axios";
import download from "../img/download.jpg";
import LoadingSpinner from "./Spinner";
import { useAuth } from "../services/auth";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NofavouriteImag from "../img/add_favourite.png";
import { Link } from "react-router-dom";
import Rating from "./Rating";
const WishList = () => {
  const [loading, setLoading] = useState(false);
  const [favorite, setFavorite] = useState([]);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [favoriteSorted, setFavoriteSorted] = useState([]);
  const { token, user } = useAuth();

  const handleButtonClick = () => {
    setButtonClicked((prevState) => !prevState);
  };
  //functin to sort the favorite data
  const sortFunction = () => {
    // console.log("sortfunctin is clicked");
    if (!favoriteSorted.length) {
      setFavoriteSorted(favorite);
      const sortedData = favorite
        .slice()
        .sort((a, b) => a.subscription_name.localeCompare(b.subscription_name));
      return setFavorite(sortedData);
    }

    setFavorite(favoriteSorted);
    return setFavoriteSorted([]);
  };
  const extractNumberFromSubscription = (subscriptionName) => {
    const extractedNumber = parseFloat(
      subscriptionName?.replace(/[^0-9.-]+/g, "")
    );
    return isNaN(extractedNumber) ? "N/A" : extractedNumber; // Handle cases where extraction fails
  };

  const removeFavourite = (name) => {
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
        // console.log(JSON.stringify(response.data));
        return toast.warning(response.data.message);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
        GetFavorite();
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
  useEffect(() => {
    GetFavorite();
  }, []);
  return (
    <>
      <Navbar onButtonClick={handleButtonClick} />
      <SideBar
        buttonClicked={buttonClicked}
        onButtonClick={handleButtonClick}
      />
      <div className="wishListLoder">
        <LoadingSpinner loading={loading} />
      </div>
      <main className="app-content ">
        <section className="discover-list-section mt-5">
          <div className="container">
            <div className="row justify-content-center">
              <div className="sort-btn">
                <button
                  className="dtab-sort-btn"
                  id="sort-btn"
                  onClick={sortFunction}
                >
                  <FontAwesomeIcon icon={faSort} className="mx-2" />
                  Sort By Service
                </button>
              </div>
              <div className="col-md-11">
                <div className="table-container discover-table w-nowrap">
                  <div className="table-responsive">
                    <table className="table">
                      <thead className="text-center">
                        <tr>
                          <th className="text-left br-none px-4 ">Service</th>
                          <th className="br-none">Rating</th>
                          {/* <!-- <th><img className="w-35px table-fam-head" src="img/family.png" alt="Family"></th><th><img className="w-35px table-fam-head" src="img/lcd.png" alt="LCD"></th> --> */}
                          <th className="br-none">Free Trial?</th>
                          <th className="text-left br-none px-4">from $</th>
                          {/* <!-- <th className="br-none">Ads</th> --> */}
                          <th className="br-none"></th>
                          <th className="br-none"></th>
                        </tr>
                      </thead>
                      <tbody className="text-center">
                        {/* <!-- row01 --> */}
                        {favorite?.length > 0 ? (
                          favorite?.map((sub, index) => (
                            <tr
                              className="v-middle   dt-drop-shadow"
                              key={sub.id}
                            >
                              <td className="br-rad-left bg-white cst-mg-icon-pd">
                                <div className="service-contain">
                                  <label className="container-label-text">
                                    <div className="image-box">
                                      <img
                                        className="icon-customer rounded-circle"
                                        alt="Disney"
                                        src={
                                          sub?.subscriptiondetails?.logoURL
                                            ? sub?.subscriptiondetails
                                                ?.logoURL === "TBA"
                                              ? download
                                              : sub?.subscriptiondetails
                                                  ?.logoURL
                                            : download
                                        }
                                      />
                                    </div>
                                    <span className="fixed-number text-left">
                                      <h6>{sub?.subscription_name}</h6>
                                      <span className="text-description text-wrap">
                                        {sub?.subscriptiondetails?.subscriptionDescriptionShort?.slice(
                                          0,
                                          50
                                        )}
                                      </span>
                                    </span>
                                  </label>
                                </div>
                              </td>
                              <td className="bg-white star-icons">
                                {/* {sub?.subscriptiondetails?.rating || 0} */}
                                {/* <ReactStars
                                  size={18}
                                  count={5}
                                  color={"#212529"}
                                  activeColor={"orange"}
                                  value={sub?.subscriptiondetails?.rating}
                                  edit={false}
                                  isHalf={true}
                                  emptyIcon={<FaRegStar />}
                                  halfIcon={<FaStarHalfAlt />}
                                  filledIcon={<FaStar />}
                                /> */}

                                <Rating
                                  value={sub?.subscriptiondetails?.rating || 0}
                                />
                              </td>

                              {/* <!-- <td className=" watch-screen text-center">1</td> --> */}
                              {/* <!-- <td className="view-quality text-center">HD</td> --> */}
                              <td className="user-free-trail text-center bg-white">
                                {/* <i className="fa-solid fa-check check-avail-icon"></i> */}
                                {sub?.subscriptiondetails?.freeTrial ===
                                "Yes" ? (
                                  <FontAwesomeIcon icon={faCheck} />
                                ) : (
                                  <FontAwesomeIcon icon={faXmark} />
                                )}
                                {/* <FontAwesomeIcon icon={faCheck} /> */}
                              </td>
                              <td className="bg-white">
                                <div className="rate d-flex">
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
                              {/* <!-- <td className="ads-visible text-center"><i className="fa-solid fa-check"></i></td> --> */}
                              <td className="bg-white">
                                <Link
                                  to={`/service/${sub?.subscription_name}`}
                                  className="btn-primary btn-more-info"
                                >
                                  More Info
                                </Link>
                              </td>
                              <td className="fav-things br-rad-right bg-white">
                                <div className="con-like">
                                  <input
                                    title="like"
                                    type="checkbox"
                                    className="like"
                                    onChange={() =>
                                      removeFavourite(sub.subscription_name)
                                    }
                                    checked // Add "checked" attribute to fill the checkbox by default
                                  />
                                  <div className="checkmark">
                                    <svg
                                      viewBox="0 0 24 24"
                                      className="filled"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"></path>
                                    </svg>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="7" className="text-center border-0">
                              <img
                                src={NofavouriteImag}
                                className="noFavouriteDatImg"
                                alt="no data"
                                style={
                                  {
                                    /* height: fit-content; */
                                  }
                                }
                              />
                            </td>
                          </tr>
                        )}
                        {/* <!-- row 02 --> */}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
      <Footer />
    </>
  );
};

export default WishList;

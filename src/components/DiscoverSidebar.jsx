import { faChevronRight, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import hotDeal from "../img/hot-deal.png";
import drink from "../img/drinks.png";
import box from "../img/box.png";
import giftBox from "../img/gift-box.png";
import heart from "../img/heart.png";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { OpenRoute } from "../utility/ApiServices";

const DiscoverSidebar = ({
  setCurrentCategory,
  DiscoverSideBar,
  handleSideBar,
  setSubscription,
  setLoading,
}) => {
  const categories = useSelector((state) => state.category);

  const subCategoriesFilter = (key, values, category) => {
    setCurrentCategory(category); // setting the active category in discover components
    // console.log("subcategories", category);
    setLoading(true);
    OpenRoute.filter({
      key: key,
      value: values,
    })
      .then((response) => {
        let sub = response.data.subscriptions;
        if (sub.length <= 0) {
          // console.log("not data found");
          toast.error(`No Subscription Found With ${values} ${key}`);
        }
        // console.log(sub);
        setSubscription(sub);
      })
      .catch((error) => {
        console.log(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <aside
        style={{ width: "305px !important" }}
        className={`sidebar mbmt-78px mt-51px w-xxl discover_sidebar ${
          DiscoverSideBar ? "open" : ""
        }`}
        id="sidebar"
      >
        {/* <!-- aside close btn --> */}
        <div className="menu-close d-xl-none">
          <span onClick={handleSideBar} style={{ cursor: "pointer" }}>
            <FontAwesomeIcon icon={faXmark} />
          </span>
        </div>
        {/* <!-- aside close btn --> */}
        <div className="sidebar-content discover-bg">
          <span className=" app-c-head mt-2 mx-3 ">Misc categories</span>
          <ul className="app-menu mt-3">
            <li
              className="s-2-menu"
              onClick={() => subCategoriesFilter("sort", "Most Popular")}
              style={{ cursor: "pointer" }}
            >
              <img
                src={hotDeal}
                className="app-menu-_discover mx-3 w-20"
                alt="hotdeal"
              ></img>
              <span className="app-menu__label app-2-menu">MostPopular</span>
              <span className="chev-left chev_left1">
                <FontAwesomeIcon icon={faChevronRight} />
              </span>
            </li>
            <li
              className="s-2-menu mt-3"
              onClick={() => subCategoriesFilter("sort", "Explore")}
              style={{ cursor: "pointer" }}
            >
              <img
                src={drink}
                className="app-menu-_discover mx-3 w-20"
                alt="driks.png"
              ></img>
              <span className="app-menu__label app-2-menu">Explore</span>
              <span className="chev-left chev_left1">
                <FontAwesomeIcon icon={faChevronRight} />
              </span>
            </li>
            <li
              className="s-2-menu mt-3"
              onClick={() => subCategoriesFilter("sort", "New Release")}
              style={{ cursor: "pointer" }}
            >
              <img
                src={box}
                alt="box"
                className="app-menu-_discover mx-3 w-20"
              ></img>
              <span className="app-menu__label app-2-menu">New Release</span>
              <span className="chev-left chev_left1">
                <FontAwesomeIcon icon={faChevronRight} />
              </span>
            </li>
            <li
              className="s-2-menu mt-3"
              onClick={() => subCategoriesFilter("sort", "Gift Subscription")}
              style={{ cursor: "pointer" }}
            >
              <img
                src={giftBox}
                alt="gift"
                className="app-menu-_discover mx-3 w-20"
              ></img>
              <span className="app-menu__label app-2-menu">
                Gift Subscription
              </span>
              <span className="chev-left chev_left1">
                <FontAwesomeIcon icon={faChevronRight} />
              </span>
            </li>
            {/* <!-- side second fiavourite menu --> */}
            <div className="nav-sub-show mt-4">
              <span className=" app-c-head  mx-3 ">Favourites</span>
            </div>
            <li>
              <Link className="app-menu__item fav-menu-items" to="/wishlist">
                <img
                  src={heart}
                  alt="heart"
                  className="app-menu__icon mx-3 w-20"
                ></img>
                <span className="app-menu__label__2">Wishlist</span>
              </Link>
            </li>
            <div className="nav-sub-show mt-2">
              <span className=" app-c-head mt-1 mx-3 ">
                SUBSCRIPTION CATEGORIES
              </span>
            </div>
            {categories?.map((cate, index) => (
              <div key={index}>
                <li>
                  <div className="dropdown">
                    <Link
                      className="app-menu__item dropdown-toggle"
                      role="button"
                      id="dropdownMenuLink"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      to="#"
                    >
                      <img
                        src={`${process.env.REACT_APP_global_url}/public/${cate?.image}`}
                        alt="img"
                        className="app-menu__icon mx-3 w-20"
                      ></img>
                      <span className="app-menu__label__2 cat-name">
                        {cate?.name}
                      </span>
                      <FontAwesomeIcon icon={faChevronRight} className="mx-2" />
                    </Link>
                    <ul
                      className="dropdown-menu dropsown_list"
                      aria-labelledby="dropdownMenuLink"
                    >
                      {cate?.subcategories?.map((subCat, ind) => (
                        <li
                          key={ind}
                          onClick={() =>
                            subCategoriesFilter(
                              "subcategory_name",
                              subCat?.name,
                              cate.name
                            )
                          }
                          style={{ cursor: "pointer" }}
                        >
                          <span
                            className="dropdown-item cat-name subcategory_name"
                            style={{ width: "auto" }}
                            // href="/coomin"
                          >
                            {subCat?.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              </div>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default DiscoverSidebar;

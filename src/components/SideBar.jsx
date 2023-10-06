import React from "react";
import LoginIcon from "../img/login-icon.png";
import HomeIcon from "../img/Home.png";
import ClanderIcon from "../img/calendar.png";
import GearIcon from "../img/gear.png";
import Whishlist from "../img/wishlist-icon.png";
import TickSquareIcon from "../img/Tick Square.png";
import axios from "axios";
import "../css/style.css";

import { logout } from "../features/authSlice";
import { useDispatch } from "react-redux";
import { faRightFromBracket, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "../services/auth";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
const SideBar = ({ buttonClicked, onButtonClick }) => {
  const { user, token } = useAuth();
  const dispatch = useDispatch();
  function handleLogut() {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_global_url}/api/auth/logout`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .request(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        dispatch(logout());
        return localStorage.clear();
      })
      .catch((error) => {
        console.log(error);
        return toast.error("Something went wrong");
      });
  }
  return (
    <>
      <aside
        id="sidebar"
        // className={`mt-87px ${buttonClicked ? "sidebar" : ""}`}
        className={`sidebar mbmt-78px mt-78px   ${buttonClicked ? "open" : ""}`}
      >
        {/* <!-- aside close btn --> */}
        <div className="menu-close d-xl-none">
          <span style={{ cursor: "pointer" }} onClick={onButtonClick}>
            <FontAwesomeIcon icon={faXmark} />
          </span>
        </div>
        {/* <!-- aside close btn --> */}
        <div className="sidebar-content">
          <div className="app-sidebar__user">
            <img
              className="app-sidebar__user-avatar w-46px"
              src={LoginIcon}
              alt="User"
            />
            <div>
              <h6 className="app-sidebar__user-name">{user?.name}</h6>
            </div>
            <div className="sign-out error-div mx-4 pb-1" onClick={handleLogut}>
              <span>
                <FontAwesomeIcon icon={faRightFromBracket} />
              </span>
            </div>
          </div>
          <ul className="app-menu">
            <li>
              <NavLink className="app-menu__item" to="/manage">
                <img
                  src={HomeIcon}
                  className="app-menu__icon mx-3 w-20"
                  alt="app"
                ></img>
                <span className="app-menu__label">Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink className="app-menu__item" to="/calendar">
                <img
                  src={ClanderIcon}
                  className="app-menu__icon mx-3 w-20"
                  alt="menu"
                ></img>
                <span className="app-menu__label">Calendar</span>
              </NavLink>
            </li>
            <li>
              <NavLink className="app-menu__item" to="/wishlist">
                <img
                  src={Whishlist}
                  className="app-menu__icon mx-3 w-20"
                  alt="whishlist"
                ></img>
                <span className="app-menu__label">Wishlist</span>
              </NavLink>
            </li>
            <li>
              <NavLink className="app-menu__item" to="/AccountSettings">
                <img
                  src={GearIcon}
                  className="app-menu__icon mx-3 w-20"
                  alt="loading"
                ></img>
                <span className="app-menu__label">Account Settings</span>
              </NavLink>
            </li>
            <hr />
            <span className=" m2-head mt-2 mx-4 fs-17">Subdefy Discover</span>
            <li>
              <NavLink className="app-menu__item mt-2" to="/discover">
                <img
                  src={TickSquareIcon}
                  className="app-menu__icon mx-3 w-20"
                  alt="loading"
                ></img>
                <span className="app-menu__label">Explore Subscription</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default SideBar;

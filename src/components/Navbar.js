import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import logo from "../img/logo.png";
import userInfo from "../img/boy.png";
import "../css/style.css";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../services/auth";

function Navbar({ onButtonClick }) {
  const [isActive, setIsActive] = useState(false);
  const handleClick = (event) => {
    setIsActive((current) => !current);
  };
  const { isLoggedIn, token, user } = useAuth();
  return (
    <header className="header-wrap sticky">
      <div className="header-bottom">
        <div className="container">
          <nav className="navbar navbar-expand-md navbar-light">
            <NavLink className="navbar-brand" to="/home">
              <img src={logo} className="logo" alt="logo" />
            </NavLink>
            <div
              className={` navbar-collapse main-menu-wrap ${
                isActive ? "open" : ""
              } ${isActive ? "" : "collapse"} `}
              id="navbarSupportedContent"
            >
              <div className="menu-close d-xl-none" onClick={handleClick}>
                <span style={{ cursor: "pointer" }}>
                  <FontAwesomeIcon icon={faXmark} />
                </span>
              </div>
              <ul className="navbar-nav m-auto">
                <li className="nav-item">
                  <NavLink
                    className="nav-link "
                    onClick={handleClick}
                    to="/discover"
                  >
                    Discover
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/" onClick={handleClick} className="nav-link ">
                    Manage
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/pay"
                    onClick={handleClick}
                    className="nav-link "
                  >
                    Pay
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/investerhub"
                    onClick={handleClick}
                    className="nav-link "
                  >
                    Investor Hub
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/blogs"
                    onClick={handleClick}
                    className="nav-link "
                  >
                    Blog
                  </NavLink>
                </li>
              </ul>
              {!isLoggedIn && !token && (
                <div className="lg-none ms-auto" style={{ marginLeft: "78px" }}>
                  <Link to="/login" className="btn signup-btn">
                    Sign Up Free
                  </Link>
                </div>
              )}

              {isLoggedIn && token && (
                <div className="user_Profile">
                  <Link to="/AccountSettings">
                    <img
                      src={
                        user?.user_image
                          ? `${process.env.REACT_APP_global_url}/public/${user.user_image}`
                          : userInfo
                      }
                      alt="User"
                      onClick={onButtonClick}
                      style={{
                        cursor: "pointer",
                        width: "48px",
                        marginLeft: "21px",
                        borderRadius: "50%",
                        height: "48px",
                      }}
                    />
                  </Link>
                </div>
              )}
            </div>
          </nav>
          <div className="mobile-menu d-xl-none">
            <span onClick={handleClick}>
              <FontAwesomeIcon icon={faBars} />
            </span>
          </div>
          {isLoggedIn && token && (
            <Link to="/AccountSettings">
              <div className="mobile-menu d-xl-none">
                <img
                  src={
                    user?.user_image
                      ? `${process.env.REACT_APP_global_url}/public/${user.user_image}`
                      : userInfo
                  }
                  alt="User"
                  onClick={onButtonClick}
                  style={{
                    cursor: "pointer",
                    width: "40px",
                    borderRadius: "50%",
                    height: "40px",
                  }}
                />{" "}
              </div>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
export default Navbar;

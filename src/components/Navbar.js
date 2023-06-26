import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import logo from '../img/logo.png';
import '../css/style.css';
import '../js/main.js'; 
import { NavLink } from 'react-router-dom'
import {useState} from 'react';

function Navbar() {



  const [isActive, setIsActive] = useState(false);

  const handleClick = event => {
    setIsActive(current => !current); 
  };
  
  return (
    <header className="header-wrap sticky">
        <div className="header-bottom">
        <div className="container">
            <nav className="navbar navbar-expand-md navbar-light">
            <NavLink className="navbar-brand"  to="/">
                <img src={logo} className="logo" alt="logo" />
            </NavLink>
            <div  className={` navbar-collapse main-menu-wrap ${isActive ? "open" : ""} ${isActive ? "" : "collapse"} `} id="navbarSupportedContent">
                <div className="menu-close d-xl-none" onClick={handleClick} >
                <a href="/#">
                    <FontAwesomeIcon icon={ faXmark} /> 
                </a>
                </div>
               
                <ul className="navbar-nav m-auto">
                  <li className="nav-item">
                    <NavLink className="nav-link" onClick={handleClick} to="/discover">Discover</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/manage"  onClick={handleClick} className="nav-link">Manage</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/pay" onClick={handleClick} className="nav-link">Pay</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/investor-hub" onClick={handleClick} className="nav-link">Investor Hub</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/blogs" onClick={handleClick} className="nav-link">Blogs</NavLink>
                  </li>
                </ul>
                
                <div className="lg-none ms-auto">
                <a href="/#" className="btn signup-btn">Sign Up Free</a>
                </div>
            </div>
            </nav>
            <div className="mobile-menu d-xl-none" >
            <a href="/#"  onClick={handleClick}>
                <FontAwesomeIcon icon={ faBars} />
            </a>
            </div>
        </div>
        </div>
    </header>
);
}

export default Navbar;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { NavLink } from "react-router-dom";
import { useState } from "react";
function Footer() {
  const [isActive, setIsActive] = useState(false);

  const handleClick = (event) => {
    setIsActive((current) => !current);
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-3">
            <ul className="p-0">
              <li className="nav-ai">
                <NavLink
                  className="footer-links"
                  onClick={handleClick}
                  to="/privacy-policy"
                >
                  PRIVACY & COOKIES
                </NavLink>
              </li>
              <li className="nav-ai">
                <NavLink
                  className="footer-links"
                  onClick={handleClick}
                  to="/support"
                >
                  SUPPORT & FEEDBACK
                </NavLink>
              </li>
              <li className="nav-ai">
                <NavLink
                  className="footer-links"
                  onClick={handleClick}
                  to="/affilate-disclouser"
                >
                  AFFILIATE DISCLOSURE
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="col-md-3">
            <ul className="p-0">
              <li className="nav-ai">
                <NavLink
                  className="footer-links"
                  onClick={handleClick}
                  to="/about"
                >
                  ABOUT US
                </NavLink>
              </li>
              <li className="nav-ai">
                <NavLink
                  className="footer-links"
                  onClick={handleClick}
                  to="/security"
                >
                  SECURITY
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="col-md-3">
            <div className="email-box">
              <h6>SIGN UP FOR OUR NEWSLETTER</h6>
              <form>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id=""
                    placeholder="email@email.com"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-main">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="row justify-content-end">
          <div className="col-md-3">
            <div className="social-icons mt-4">
              <ul>
                <li>
                  <a href="/#">
                    <FontAwesomeIcon icon={faFacebookF} />
                  </a>
                </li>
                <li>
                  <a href="/#">
                    <FontAwesomeIcon icon={faInstagram} />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

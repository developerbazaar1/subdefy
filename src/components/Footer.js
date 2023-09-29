import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { OpenRoute } from "../utility/ApiServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "../components/Spinner";
import { useEffect } from "react";
function Footer() {
  const [pages, setPages] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState, reset } = useForm();
  const { errors } = formState;
  const handleClick = (event) => {
    setIsActive((current) => !current);
  };

  const NewsLetterSubmit = (data, e) => {
    e.preventDefault();
    // console.log(data);
    setLoading(true);
    OpenRoute.newsLetter({ email: data.newsLetterEmail })
      .then((response) => {
        console.log(response.data.message);
        toast.success(response.data.message);
      })
      .catch((error) => {
        if (error?.response?.data?.message) {
          return toast.error(error.response.data.message);
        }
        return toast.error(error.message);
      })
      .finally(() => {
        reset();
        setLoading(false);
      });
  };

  const GetPages = () => {
    OpenRoute.FooterPages()
      .then((response) => {
        setPages(response.data.pages);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    GetPages();
  }, []);

  return (
    <footer className="footer">
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "109%",
        }}
      >
        <LoadingSpinner loading={loading} />
      </div>
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
              {/* <li className="nav-ai">
                <NavLink
                  className="footer-links"
                  onClick={handleClick}
                  to="/affilate-disclouser"
                >
                  AFFILIATE DISCLOSURE
                </NavLink>
              </li> */}
              {pages?.map((page) => (
                <li className="nav-ai" key={page.id}>
                  <NavLink
                    className="footer-links"
                    to={`/info/${page.page_name}`}
                    state={{ fromHome: { page } }}
                  >
                    {page.page_name.toUpperCase()}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-md-3">
            <ul className="p-0">
              <li className="nav-ai">
                <NavLink className="footer-links" to="/about">
                  ABOUT US
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="col-md-3">
            <div className="email-box">
              <h6>SIGN UP FOR OUR NEWSLETTER</h6>
              <form onSubmit={handleSubmit(NewsLetterSubmit)}>
                <div className="mb-3">
                  <label htmlFor="newsLetterEmail">
                    <input
                      type="email"
                      className="form-control"
                      id="newsLetterEmail"
                      placeholder="email@email.com"
                      // required
                      {...register("newsLetterEmail", {
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid Email Address",
                        },
                        required: {
                          value: true,
                          message: "Email is Required",
                        },
                      })}
                    />
                  </label>

                  <div className="error-div">
                    {errors?.newsLetterEmail?.message}
                  </div>
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
                  <a href="facebook">
                    <FontAwesomeIcon icon={faFacebookF} />
                  </a>
                </li>
                <li>
                  <a href="instagram">
                    <FontAwesomeIcon icon={faInstagram} />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
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
    </footer>
  );
}

export default Footer;

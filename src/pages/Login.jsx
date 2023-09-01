import React, { useState } from "react";
import Navbar from "../components/Navbar.js";
import Footer from "../components/Footer.js";
import BackToTopButton from "../components/BackToTopButton.js";
import { useForm } from "react-hook-form";
import LoginIcon from "../img/login-icon.png";
import Google from "../img/google.png";
import { signInWithPopup, auth, provider } from "../services/Firebase.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import LoadingSpinner from "../components/Spinner.jsx";
import axios from "axios";
import { login } from "../features/authSlice.js";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const loginForm = useForm();
  const signupForm = useForm();
  const { register, handleSubmit, formState } = loginForm;
  const {
    register: register1,
    handleSubmit: handleSubmit1,
    formState: formState1,
  } = signupForm;
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("login"); // Set the default active tab to 'login'
  //form to cheange the active tab
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  const { errors } = formState;
  const { errors: errors1 } = formState1;
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  //        function to handle login    //
  const loginSubmit = (data, e) => {
    setLoading(true);
    e.preventDefault();

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_global_url}/api/auth/login`,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(data),
    };

    axios
      .request(config)
      .then((response) => {
        const token = response.data.token;

        dispatch(
          login({
            user: response.data.user,
            token: response.data.token,
          })
        );

        // const token = "your-token-value"; // Replace with your actual token value
        localStorage.setItem("auth", token);
        return toast.success(response.data.message);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          return toast.warning(error.response.data.message);
          // You can display an error message to the user here
        } else {
          // console.log("An error occurred:", error.message);
          return toast.error(error.message);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // login with google sso
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const gname = result.user.displayName;
        const gemail = result.user.email;
        const profilePic = result.user.photoURL;

        const data = {
          name: gname,
          email: gemail,
          provider: "google",
        };

        let config = {
          method: "post",
          maxBodyLength: Infinity,
          url: `${process.env.REACT_APP_global_url}/api/auth/sso`,
          headers: {
            "Content-Type": "application/json",
          },
          data: JSON.stringify(data),
        };

        axios
          .request(config)
          .then((response) => {
            const token = response.data.token;

            dispatch(
              login({
                user: response.data.user,
                token: response.data.token,
              })
            );

            // const token = "your-token-value"; // Replace with your actual token value
            localStorage.setItem("auth", token);
            return toast.success(response.data.message);
          })
          .catch((error) => {
            if (error.response && error.response.status === 401) {
              return toast.warning(error.response.data.message);
              // You can display an error message to the user here
            } else {
              // console.log("An error occurred:", error.message);
              return toast.error(error.message);
            }
          })
          .finally(() => {
            setLoading(false);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const registerSubmit = (data, e) => {
    e.preventDefault();
    setLoading(true);
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_global_url}/api/auth/register`, // Use template string
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(data),
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        const token = response.data.token;

        dispatch(
          login({
            user: response.data.user,
            token: response.data.token,
          })
        );

        // const token = "your-token-value"; // Replace with your actual token value
        localStorage.setItem("auth", token);
        return toast.success(response.data.message);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          return toast.warning(error.response.data.errors.email[0]);
          // You can display an error message to the user here
          // console.log(error.response.data.errors.email);
        } else {
          // console.log("An error occurred:", error.message);
          return toast.error(error);
        }
      })
      .finally(() => {
        setLoading(false);
      });

    // console.log(data, "second form data");
  };
  return (
    <div>
      {/**************** Navbar component ******************/}
      <Navbar />

      <section className="main-section main-section-new login-bg ">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-5  mt-4 mb-160">
              {/* <!-- form main heading and logo start from here --> */}
              <div className="log-form-ad text-center mb-4">
                <div className="log-logo">
                  <img className="logo-small" src={LoginIcon} alt="icon" />
                </div>
                <div className="form-head mt-4 log-top-label">
                  <h6>
                    {activeTab === "login"
                      ? "Sign up to manage your recurring expenses for free"
                      : "Sign up to manage your recurring expenses for free"}
                  </h6>
                </div>
              </div>

              <div
                style={{
                  position: "absolute",
                  left: "48%",
                  top: "57%",
                }}
              >
                <LoadingSpinner loading={loading} />
              </div>
              {/* <!--:: form content --> */}
              <div className="login-signup-form">
                <div className="login_box box bg-white">
                  {/* <!-- login in signup tab switch button start from here --> */}
                  <div className="form_tab  ">
                    <ul className="nav nav-tabs nav-justified">
                      <li className="nav-item log-tab">
                        <a
                          className={`log-tab link nav-link ${
                            activeTab === "login" ? "active" : ""
                          }`}
                          data-bs-toggle="tab"
                          href="#home"
                          onClick={() => handleTabChange("login")}
                        >
                          Log In
                        </a>
                      </li>
                      <li className="nav-item log-tab">
                        <a
                          className={`log-tab-link nav-link ${
                            activeTab === "signup" ? "active" : ""
                          }`}
                          onClick={() => handleTabChange("signup")}
                          data-bs-toggle="tab"
                          href="#menu1"
                        >
                          Sign Up
                        </a>
                      </li>
                    </ul>
                  </div>
                  {/* <!-- tab switch buton end --> */}
                  {/* <!-- tab 01 :: Tab panes detail conatiner --> */}
                  <div className="tab-content pb-2 mt-4">
                    <div className="tab-pane container mb-4 active" id="home">
                      {/* <!-- login-tab-form  --> */}
                      <form
                        className="login-tab-form"
                        onSubmit={handleSubmit(loginSubmit)}
                      >
                        {/* <!-- first field :: email --> */}
                        <div className="form-tab-container ">
                          <div className="form-group mb-2">
                            <div className="error-div">
                              <label
                                className="form-head acc-label"
                                htmlFor="email"
                              >
                                Email
                              </label>
                              <span className="text">
                                {errors.email?.message}
                              </span>
                            </div>
                            <input
                              className="form-control mt-2 log-control"
                              id="email"
                              type="text"
                              aria-describedby="title"
                              {...register("email", {
                                pattern: {
                                  value:
                                    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                  message: "Invalid Email Address",
                                },
                                required: {
                                  value: true,
                                  message: "Email is Required",
                                },
                              })}
                            />
                          </div>
                          {/* <!-- second filed :: password --> */}
                          <div className="form-group">
                            <div className="error-div">
                              <label
                                className="form-head acc-label"
                                htmlFor="password"
                              >
                                {" "}
                                Password
                              </label>
                              <span className="text">
                                {errors.password?.message}
                              </span>
                            </div>
                            <div className="user_password">
                              <input
                                className="form-control mt-2 log-control"
                                id="password"
                                type={showPassword ? "text" : "password"}
                                aria-describedby="title"
                                {...register("password", {
                                  required: {
                                    value: true,
                                    message: "Password is Required",
                                  },
                                })}
                              />
                              <span
                                className="password-toggle"
                                onClick={handleTogglePassword}
                              >
                                {showPassword ? (
                                  <FontAwesomeIcon icon={faEye} />
                                ) : (
                                  <FontAwesomeIcon icon={faEyeSlash} />
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* <!-- :: submit login infobtn --> */}
                        <div className="form-group mt-3">
                          <button
                            type="submit"
                            className="btn btn-log-submit mt-2 mb-2 mx-auto w-100"
                          >
                            Log In
                          </button>
                          <br />
                        </div>

                        <div className="form-footer ">
                          <div className="form-footer-text text-center ">
                            <span>
                              <a
                                href="#Forgot"
                                className="forgot_password"
                                // className="back-login text-blue"
                                // onClick={() => handleTabChange("login")}
                                // style={{ color: "text-blue" }}
                              >
                                Forgot Password
                                <span
                                  style={{
                                    color: "#80c3d2",
                                    marginLeft: "2px",
                                  }}
                                >
                                  {" "}
                                  ?
                                </span>
                              </a>
                            </span>
                          </div>
                        </div>
                      </form>

                      <div className="hr-container  mtmb-26px">
                        <hr className="custom-hr" />
                        <span className="text-over-hr">OR</span>
                      </div>
                      {/* <!-- social login button start here --> */}
                      <div className="social-log-container">
                        <div className="fb-log">
                          <a
                            href="https://www.facebook.com/login/"
                            className="btn fb-log-btn fb-log-btn w-100"
                          >
                            <FontAwesomeIcon
                              icon={faFacebookSquare}
                              size="2x"
                              className="facebook-icon"
                            />
                            SIGN IN WITH FACEBOOK
                          </a>
                        </div>
                        <div className="fb-log mt-4">
                          <span
                            // href="#"
                            className="btn google-log-btn w-100"
                            onClick={signInWithGoogle}
                          >
                            <img
                              src={Google}
                              className="w-20 mx-3 fs-20 mb-1"
                              alt="loading"
                            ></img>
                            SIGN IN WITH GOOGLE{" "}
                          </span>
                        </div>
                      </div>
                      {/* <!-- social login button start here --> */}
                    </div>
                    {/* <!-- :: tab 02  sign in--> */}
                    <div
                      className="tab-pane container fade"
                      id="menu1"
                      style={{ paddingBottom: "19px" }}
                    >
                      {/* <!-- signup-tab-form --> */}
                      <form
                        className="signup-tab-form"
                        onSubmit={handleSubmit1(registerSubmit)}
                      >
                        <div className="form-tab-container ">
                          {/* <!-- first field user name --> */}
                          <div className="form-group mb-2">
                            <div className="error-div">
                              <label
                                className="form-head acc-label"
                                htmlFor="name"
                              >
                                Full Name
                              </label>
                              {errors1.name?.message}
                            </div>
                            <input
                              className="form-control mt-2 log-control"
                              id="name"
                              type="text"
                              aria-describedby="title"
                              {...register1("name", {
                                required: {
                                  value: true,
                                  message: "Fullname is Required",
                                },
                              })}
                            />
                          </div>
                          {/* <!-- second field email:: --> */}
                          <div className="form-group mb-2">
                            <div className="error-div">
                              <label
                                className="form-head acc-label"
                                htmlFor="email"
                              >
                                Email Id
                              </label>
                              <span className="text-[red]">
                                {errors1.email?.message}
                              </span>
                            </div>
                            <input
                              className="form-control mt-2 log-control"
                              id="email"
                              type="text"
                              aria-describedby="title"
                              {...register1("email", {
                                pattern: {
                                  value:
                                    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                  message: "Invalid Email Aaddress",
                                },
                                required: {
                                  value: true,
                                  message: "Email is Required",
                                },
                              })}
                            />
                          </div>
                          {/* <!-- third filed :: password --> */}
                          <div className="form-group mb-3">
                            <div className="error-div">
                              <label
                                className="form-head  acc-label"
                                htmlFor="password"
                              >
                                Password
                              </label>
                              <span className="text-[red]">
                                {errors1.password?.message}
                              </span>
                            </div>
                            <div className="user_password">
                              <input
                                className="form-control mt-2 log-control"
                                id="password"
                                type={showPassword ? "text" : "password"}
                                aria-describedby="title"
                                {...register1("password", {
                                  minLength: {
                                    value: 6, // Minimum length required
                                    message:
                                      "Password must be at least 6 characters long",
                                  },
                                  required: {
                                    value: true,
                                    message: "Password is Required",
                                  },
                                })}
                              />
                              {/* <span className="password-toggle">
                                <FontAwesomeIcon icon={faEye} />
                              </span> */}

                              <span
                                className="password-toggle"
                                onClick={handleTogglePassword}
                              >
                                {showPassword ? (
                                  <FontAwesomeIcon icon={faEye} />
                                ) : (
                                  <FontAwesomeIcon icon={faEyeSlash} />
                                )}
                              </span>
                            </div>
                          </div>
                          <div className="form-group form-check">
                            <input
                              className="form-check-input pt-1"
                              type="checkbox"
                              value=""
                              id="checkbox"
                              {...register1("defaultCheck1", {
                                required: "Please Accept The Terms",
                              })}
                            />
                            <label
                              className="form-check-label acc-terms-label mr-2"
                              htmlFor="checkbox"
                            >
                              I accept the Terms of Use
                            </label>
                            <div className="error-div term-error">
                              <span>
                                {errors1.defaultCheck1 &&
                                  errors1.defaultCheck1.message}
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* <!-- :: submit login infobtn --> */}
                        <div className="form-group mt-3 mb-3">
                          <button
                            type="submit"
                            className="btn btn-log-submit mt-2 mx-auto w-100"
                          >
                            Sign Up
                          </button>
                        </div>
                        <div className="form-footer ">
                          <div className="form-footer-text text-center ">
                            <span className="pb-3">
                              Already have an account?
                              <a
                                href="/login"
                                className="back-login text-blue"
                                onClick={() => handleTabChange("login")}
                              >
                                <strong
                                  style={{
                                    color: "#80c3d2",
                                    marginLeft: "2px",
                                  }}
                                >
                                  Log In
                                </strong>
                                <br />
                              </a>
                            </span>
                          </div>
                        </div>

                        <div className="hr-container">
                          <hr className="custom-hr" />
                          <span className="text-over-hr">OR</span>
                        </div>
                        {/* <!-- social login button start here --> */}
                        <div className="social-log-container">
                          <div className="fb-log">
                            <a
                              href="https://www.facebook.com/login/"
                              className="btn fb-log-btn fb-log-btn w-100"
                            >
                              <FontAwesomeIcon
                                icon={faFacebookSquare}
                                size="2x"
                                className="facebook-icon"
                              />
                              SIGN UP WITH FACEBOOK
                            </a>
                          </div>
                          <div className="fb-log mt-4">
                            <span
                              // href="#"
                              onClick={signInWithGoogle}
                              className="btn google-log-btn w-100"
                            >
                              <img
                                src={Google}
                                className="w-20 mx-3 fs-20 mb-1"
                                alt="loading"
                              ></img>
                              SIGN UP WITH GOOGLE{" "}
                            </span>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/**************** Footer component ****************/}
      <Footer />

      {/**************** Back to top component ****************/}
      <BackToTopButton />

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
    </div>
  );
};

export default Login;

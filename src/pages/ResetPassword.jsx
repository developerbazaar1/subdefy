import React, { useState } from "react";
import Navbar from "../components/Navbar.js";
import Footer from "../components/Footer.js";
import BackToTopButton from "../components/BackToTopButton.js";
import { useForm } from "react-hook-form";
import LoginIcon from "../img/login-icon.png";
import Reset_Password from "../img/reset-password.png";
import LoadingSpinner from "../components/Spinner.jsx";
import axios from "axios";
import { login } from "../features/authSlice.js";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const loginForm = useForm();
  const { register, handleSubmit, formState } = loginForm;

  const [showPassword, setShowPassword] = useState(false);

  //form to cheange the active tab

  const { errors } = formState;
  const forgotpassword = (data, e) => {
    e.preventDefault();
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div>
      {/**************** Navbar component ******************/}
      <Navbar />

      <section className="main-section main-section-new login-bg ">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-5  mt-4 mb-160">
              <div className="log-form-ad text-center mb-4">
                <div className="log-logo">
                  <img className="logo-small" src={LoginIcon} alt="icon" />
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
                  <div className="form-head pt-4 log-top-label">
                    <h2 className="text-center">Reset Your Password</h2>
                    <p className="text-center">
                      Your password needs to be at least 6 characters.
                    </p>
                  </div>
                  <div className="tab-content pb-2">
                    <div className="tab-pane container mb-4 active" id="home">
                      <form
                        className="login-tab-form"
                        onSubmit={handleSubmit(forgotpassword)}
                      >
                        <div className="form-tab-container ">
                          <div className="forgot-passowrd_conatainer  mtmb-26px">
                            <hr className="custom-hr" />
                            <span className="reset-password-icons">
                              <img
                                src={Reset_Password}
                                alt="reset-password"
                                style={{ width: "39px" }}
                              />
                            </span>
                          </div>
                          <div className="form-group mb-2">
                            <div className="error-div">
                              <label
                                className="form-head  acc-label"
                                htmlFor="password"
                              >
                                New Password
                              </label>
                              <span className="text-[red]">
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
                          {/* confirm password */}
                          <div className="form-group mb-2">
                            <div className="error-div">
                              <label
                                className="form-head  acc-label"
                                htmlFor="password"
                              >
                                Confirm New Password
                              </label>
                              <span className="text-[red]">
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
                        </div>

                        <div className="form-group mt-3">
                          <button
                            type="submit"
                            className="btn btn-log-submit mt-2 mb-2 mx-auto w-100 reset-password-button"
                          >
                            Set New Password
                          </button>
                          <br />
                        </div>

                        {/* <div className="form-footer ">
                          <div className="form-footer-text text-center ">
                            <span>
                              <Link
                                to="/coomin"
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
                              </Link>
                            </span>
                          </div>
                        </div> */}
                      </form>
                      {/* 
                      <div className="hr-container  mtmb-26px">
                        <hr className="custom-hr" />
                        <span className="text-over-hr">OR</span>
                      </div> */}
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
    </div>
  );
};

export default ResetPassword;

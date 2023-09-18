import React, { useState } from "react";
import Navbar from "../components/Navbar.js";
import Footer from "../components/Footer.js";
import BackToTopButton from "../components/BackToTopButton.js";
import { useForm } from "react-hook-form";
import LoginIcon from "../img/login-icon.png";
import Forgot_password from "../img/forgot-password.png";
import LoadingSpinner from "../components/Spinner.jsx";
import { login } from "../features/authSlice.js";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { OpenRoute } from "../utility/ApiServices.js";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const loginForm = useForm();
  const { register, handleSubmit, formState } = loginForm;
  const { errors } = formState;

  const resetpassword = (data, e) => {
    return alert("This is Not Yet Developed");
    setLoading(true);
    e.preventDefault();

    OpenRoute.forgotPassword({ email: data.email })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
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
                      Enter your subdefy email address that you used to
                      register. We'll send you a password reset link.
                    </p>
                  </div>
                  <div className="tab-content pb-2">
                    <div className="tab-pane container mb-4 active" id="home">
                      <form
                        className="login-tab-form"
                        onSubmit={handleSubmit(resetpassword)}
                      >
                        <div className="form-tab-container ">
                          <div className="forgot-passowrd_conatainer  mtmb-26px">
                            <hr className="custom-hr" />
                            <span className="text-over-hr forgot-password-icon">
                              <img
                                src={Forgot_password}
                                alt="forgot-password"
                                style={{ width: "39px" }}
                              />
                            </span>
                          </div>

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
                        </div>

                        <div className="form-group mt-3">
                          <button
                            type="submit"
                            className="btn btn-log-submit mt-2 mb-2 mx-auto w-100 reset-password-button"
                          >
                            Send Request
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

export default ForgotPassword;

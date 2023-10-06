import React, { useState } from "react";
import Navbar from "../components/Navbar.js";
import Footer from "../components/Footer.js";
import BackToTopButton from "../components/BackToTopButton.js";
import { useForm } from "react-hook-form";
import LoginIcon from "../img/login-icon.png";
import Reset_Password from "../img/reset-password.png";
import LoadingSpinner from "../components/Spinner.jsx";
import { login } from "../features/authSlice.js";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Alert from "react-bootstrap/Alert";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { OpenRoute } from "../utility/ApiServices.js";
const ResetPassword = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  let [searchParams, setSearchParams] = useSearchParams();
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [loading, setLoading] = useState(false);
  const loginForm = useForm();
  const { register, handleSubmit, formState, reset } = loginForm;
  const dispatch = useDispatch();
  const [passwordVisibility, setPasswordVisibility] = useState({
    showPassword1: false,
    showPassword2: false,
  });

  const token = searchParams.get("token");
  const email = searchParams.get("email");
  const { errors } = formState;

  //reset password function
  const forgotpassword = (data, e) => {
    setLoading(true);
    e.preventDefault();
    const { password, Confirmpassword } = data;
    if (password !== Confirmpassword) {
      setPasswordMatch(true);
      return;
    }
    setPasswordMatch(false);

    OpenRoute.resetPassword({ email: email, token: token, password: password })
      .then((response) => {
        dispatch(
          login({
            user: response.data.user,
            token: response.data.token,
          })
        );

        localStorage.setItem("subdefy_token", token);
        toast.success(response.data.message);
        return navigate("/manage");
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => {
        setLoading(false);
        reset();
      });
  };

  const handleTogglePassword = (fieldName) => {
    setPasswordVisibility((prevState) => ({
      ...prevState,
      [fieldName]: !prevState[fieldName],
    }));
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
                  <Alert
                    variant="success"
                    show={show}
                    dismissible
                    onClose={() => setShow(false)}
                  >
                    <p>
                      Password Reset Successful Your password has been
                      successfully reset.You can now proceed to log in with your
                      new password.
                      <Link
                        to="/login"
                        style={{
                          marginLeft: "5px",
                          textDecoration: "underline",
                        }}
                      >
                        Go to Login Page
                      </Link>
                    </p>
                  </Alert>
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
                                type={
                                  passwordVisibility.showPassword1
                                    ? "text"
                                    : "password"
                                }
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
                                onClick={() =>
                                  handleTogglePassword("showPassword1")
                                }
                              >
                                {passwordVisibility.showPassword1 ? (
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
                                htmlFor="Confirmpassword"
                              >
                                Confirm New Password
                              </label>
                              <span className="text-[red]">
                                {errors.Confirmpassword?.message}
                              </span>
                            </div>
                            <div className="user_password">
                              <input
                                className="form-control mt-2 log-control"
                                id="Confirmpassword"
                                type={
                                  passwordVisibility.showPassword2
                                    ? "text"
                                    : "password"
                                }
                                aria-describedby="title"
                                {...register("Confirmpassword", {
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
                                onClick={() =>
                                  handleTogglePassword("showPassword2")
                                }
                              >
                                {passwordVisibility.showPassword2 ? (
                                  <FontAwesomeIcon icon={faEye} />
                                ) : (
                                  <FontAwesomeIcon icon={faEyeSlash} />
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div
                          style={{
                            marginTop: "21px",
                          }}
                        >
                          {passwordMatch && (
                            <span
                              style={{
                                color: "red",
                              }}
                            >
                              password not match
                            </span>
                          )}
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

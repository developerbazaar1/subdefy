import React, { useState } from "react";
import Navbar from "../components/Navbar.js";
import Footer from "../components/Footer.js";
import BackToTopButton from "../components/BackToTopButton.js";
import { useForm } from "react-hook-form";
import LoginIcon from "../img/login-icon.png";
import Forgot_password from "../img/forgot-password.png";
import LoadingSpinner from "../components/Spinner.jsx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { OpenRoute } from "../utility/ApiServices.js";
import Alert from "react-bootstrap/Alert";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(true);
  const loginForm = useForm();
  const { register, handleSubmit, formState, reset } = loginForm;
  const { errors } = formState;

  const resetpassword = (data, e) => {
    setLoading(true);
    e.preventDefault();

    OpenRoute.forgotPassword({ email: data.email })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        toast.error("Enternal server Error");
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
        reset();
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
                  <Alert
                    variant="success"
                    show={show}
                    dismissible
                    onClose={() => setShow(false)}
                  >
                    <p className="text-center">
                      Success! password reset link has been sent to your email.
                    </p>
                  </Alert>
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
    </div>
  );
};

export default ForgotPassword;

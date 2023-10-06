import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { OpenRoute } from "../utility/ApiServices";
import { toast } from "react-toastify";
import LoadingSpinner from "../components/Spinner";
import ReCAPTCHA from "react-google-recaptcha";
const InvesterHub = () => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState, reset } = useForm();
  const { errors } = formState;
  const [captchaError, setCaptchaError] = useState("");
  const [isCpatchea, setCaptecha] = useState(false);

  const NotRobot = (value) => {
    setCaptecha(true);
    setCaptchaError("");
  };

  const investerHubSubmit = (data, e) => {
    e.preventDefault();
    if (!isCpatchea) {
      setCaptchaError("reCAPTCHA is Required");
      return;
    }
    setLoading(true);
    OpenRoute.investerHub({ email: data.investerHub, name: "investerHub" })
      .then((response) => {
        console.log(response.data.message);
        toast.success(response.data.message);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      })
      .finally(() => {
        setLoading(false);
        reset();
      });
  };

  return (
    <>
      <div className="pay__container">
        <Navbar />
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
          }}
        >
          <LoadingSpinner loading={loading} />
        </div>
        <div className="support flex-grow-1">
          <section className="investor-main pt-130 pb-180 ">
            <div className="container">
              <div className="row justify-content-center text-center mt-5">
                <div className="col-md-9 col-lg-9 col-sm-9 col-xs-12">
                  <div className="cst-main-heading mt-4">
                    <h2>Investor Hub</h2>
                    <p className="paragraph">
                      Subdefy is currently searching for investment interest in
                      the form of a S.A.F.E. or Convertible Note. Approved
                      investors who would like to download our pitch deck can do
                      so below.
                    </p>
                  </div>
                  {/* <!-- FORM --> */}
                  <div className="container mt-5">
                    <div className="investor-d-form">
                      <div
                        style={{
                          textAlign: "center",
                          color: "red",
                          marginBottom: "7px",
                        }}
                      >
                        {errors?.investerHub?.message}

                        {captchaError && (
                          <div style={{ color: "red" }}>{captchaError}</div>
                        )}
                      </div>
                      <form
                        className="inv-d-f"
                        onSubmit={handleSubmit(investerHubSubmit)}
                      >
                        <input
                          type="text"
                          className="form-item"
                          id="investerHub"
                          {...register("investerHub", {
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

                        <div className="Pay__captacha">
                          <div>
                            <ReCAPTCHA
                              sitekey={`${process.env.REACT_APP_GoogleCapcha}`}
                              onChange={NotRobot}
                              // onErrored={ErrorOccured}
                            />
                          </div>
                        </div>
                        <button className="btn i-btn">
                          Download Pitch Deck
                        </button>
                      </form>
                    </div>
                  </div>
                  {/* <!-- FORM END --> */}
                </div>
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default InvesterHub;

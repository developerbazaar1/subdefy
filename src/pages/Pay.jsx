import React from "react";
import Navbar from "../components/Navbar";
import LoginIcon from "../img/login-icon.png";
import Footer from "../components/Footer";
import { useForm } from "react-hook-form";
import { useState } from "react";
import LoadingSpinner from "../components/Spinner";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "react-toastify";
import { OpenRoute } from "../utility/ApiServices";
const Pay = () => {
  const { register, handleSubmit, formState, reset } = useForm();
  const { errors } = formState;
  const [loading, setLoading] = useState(false);
  const [isCpatchea, setCaptecha] = useState(false);
  const [captchaError, setCaptchaError] = useState("");

  const NotRobot = (value) => {
    setCaptecha(true);
    setCaptchaError("");
  };

  const paySubmitFunctin = (data, e) => {
    e.preventDefault();
    if (!isCpatchea) {
      setCaptchaError("reCAPTCHA is Required");
      return;
    }
    setLoading(true);

    OpenRoute.investerHub({ email: data.payHub, name: "pay" })
      .then((response) => {
        // console.log(response.data.message);
        toast.success(response.data.message);
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => {
        setLoading(false);
        reset();
      });
  };
  return (
    <>
      <div style={{ backgroundColor: "#fff" }} className="pay__container">
        <Navbar />
        <LoadingSpinner loading={loading} />
        <div className="payPage container pay__background__image">
          <div className="log__head">
            <div className="custom__hr"></div>
            <div className="pay__log">
              <img src={LoginIcon} alt="logo" />
            </div>
          </div>
          <h2>
            Get Early Access to{" "}
            <span style={{ color: "#80c3d2" }}>Subdefy Pay</span>
          </h2>

          <p className="mt-4 pay__paragraph">
            Subdefy Pay is under constructin! Get early access to the smarter
            way to manage your recurring expenses.
          </p>
          <p className="pay__paragraph">
            group multiple recurring payments into one payment then pay when it
            suits you!
          </p>
          <div className="container mt-5">
            <div className="investor-d-form">
              <h6> Get Notified When We Launch</h6>
              <div
                style={{
                  textAlign: "center",
                  color: "red",
                  marginBottom: "7px",
                }}
              >
                {/* {errors?.investerHub?.message} */}
              </div>
              <form
                className="inv-d-f"
                onSubmit={handleSubmit(paySubmitFunctin)}
              >
                <div className="position-relative">
                  <input
                    type="email"
                    className="pay__input"
                    id="payHub"
                    placeholder="Enter your email address"
                    {...register("payHub", {
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

                  <button className="btn  pay__button">Notify Me</button>
                </div>
                <div className="Pay__captacha">
                  <ReCAPTCHA
                    sitekey={`${process.env.REACT_APP_GoogleCapcha}`}
                    onChange={NotRobot}
                  />
                </div>

                <div
                  style={{
                    color: "red",
                  }}
                >
                  {/* "rahul" */}
                  {errors?.payHub?.message}
                  {captchaError && (
                    <div style={{ color: "red" }}>{captchaError}</div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Pay;

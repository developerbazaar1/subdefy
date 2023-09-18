import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { OpenRoute } from "../utility/ApiServices";
import { toast } from "react-toastify";
import LoadingSpinner from "../components/Spinner";
const InvesterHub = () => {
  const [isActive, setIsActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState, reset } = useForm();
  const { errors } = formState;

  const handleClick = (event) => {
    setIsActive((current) => !current);
  };

  const investerHubSubmit = (data, e) => {
    setLoading(true);
    e.preventDefault();
    OpenRoute.investerHub({ email: data.investerHub })
      .then((response) => {
        // console.log(response.data.message);
        toast.success(response.data.message);
      })
      .catch((error) => {
        toast.success(error.message);
      })
      .finally(() => {
        setLoading(false);
        reset();
      });
  };
  return (
    <>
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
      <div className="support">
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
                      <div className="error-div">
                        {/* "rahul" */}
                        {/* {errors?.newsLetterEmail?.message} */}
                      </div>
                      <button className="btn i-btn mt-4">
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
    </>
  );
};

export default InvesterHub;

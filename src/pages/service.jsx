import React from "react";
import Navbar from "../components/Navbar.js";
import Footer from "../components/Footer.js";
import BackToTopButton from "../components/BackToTopButton.js";
import arrowright from "../img/Arrow - Right.png";
import marvel from "../img/No-Image.png";
import plan from "../img/plan-2.png";
import planTopImage from "../img/plan-top-image.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { OpenRoute } from "../utility/ApiServices.js";
import { useEffect } from "react";
import defaultBanner from "../img/default-banner-3.jpg";
import LoadingSpinner from "../components/Spinner";
const Service = () => {
  const { name } = useParams();
  const [subscription, setSubscription] = useState({});
  const [loading, setLoading] = useState(false);

  // console.log(name);

  const getSubscr = () => {
    setLoading(true);
    OpenRoute.subscriptionByName({
      name: name,
    })
      .then((response) => {
        console.log(response.data.subscription.plans);
        setSubscription(response?.data?.subscription);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (name) {
      getSubscr();
    }
  }, [name]);
  return (
    <div className="service">
      {/**************** Navbar component ******************/}

      <Navbar />
      <div
        style={{
          position: "absolute",
          zIndex: "999",

          left: "48%",
          top: "40%",
        }}
      >
        <LoadingSpinner loading={loading} />
      </div>
      <section
        className="main-section plan-article-image "
        style={{ marginTop: "5rem" }}
      >
        <div className="container-fluid position-relative">
          <div className="row">
            <div className="col-md-6 col-sm-12 col-xs-12 service-col">
              <div className="row">
                <div className="col-md-4">
                  <a
                    href={`https://${subscription?.signUpUrl}`}
                    // href="http//google.com"
                    target="_blank"
                    className="btn-plan-log"
                    rel="noreferrer"
                  >
                    Sign Up
                  </a>
                  <a
                    href="#plan-gallary"
                    className="top-to-bottom-btn d-none-sm"
                  >
                    <FontAwesomeIcon icon={faArrowDown} />
                  </a>
                </div>
                <div className="col-md-8 p-1_5rem">
                  <span className="ott-date-mute">
                    Form {subscription?.premiumSubscriptionsFrom}
                  </span>
                  <h1 className="banner-ott-head mt-4">
                    {subscription?.subscriptionName}
                  </h1>
                  <p className="banner-ott-script">
                    {/* Disney's streaming service is packed full of the best shows
                    and movies to keep you and the family entertained. */}
                    {subscription?.subscriptionDescriptionShort}
                  </p>
                  <Link to="/" className="text-link mt-2">
                    Add To My Subscriptions{" "}
                    <img className="w-20 " src={arrowright} alt="" />
                  </Link>
                </div>
                <div className="ott-warning-text text-end mt-2 mb-3">
                  <span className="ott-warning-note">
                    Subdefy does not guarantee the accuracy of this information.
                    Subdefy may be compensated for referral to this service.
                  </span>
                </div>
              </div>
            </div>
            <div className="col-md-6 d-none-sm px-0">
              <div className="plan-banner-image w-100 service-banner-img">
                <div className="image-source">
                  <span>
                    Image Source:{" "}
                    <a
                      // href="#"
                      className="img-src"
                      href={`${subscription?.banner_image}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {" "}
                      {subscription?.banner_image}
                    </a>
                  </span>
                </div>
                <img
                  className="w-100 h-100 service-object-fit"
                  src={
                    subscription?.banner_image
                      ? `${subscription?.banner_image}`
                      : defaultBanner
                  }
                  alt="bannerImage"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="plan-banner pt-5 bg-white">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-11 col-lg-11 col-sm-12 col-xs-12 text-center">
              <div className="gallery-heading main-heading">
                <h2>About</h2>
              </div>
              <p>{subscription?.subscriptionDescriptionLong}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="plan-banner pt-5 bg-white" id="plan-gallary">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-11 col-lg-11 col-sm-12 col-xs-12 text-center">
              <div className="gallery-heading main-heading">
                <h2>Gallery</h2>
              </div>
              <div className="gallery mt-4">
                {subscription?.gallery_image ? (
                  <div className="image-ott-gallary">
                    <img src={subscription?.gallery_image} alt="gallery" />
                  </div>
                ) : (
                  <div className="image-ott-gallary">
                    <img src={marvel} alt="Image1" />
                  </div>
                )}

                {/* <div className="image-ott-gallary">
                  <img src={plan} alt="Image1" />
                </div> */}
                {/* <div className="image-ott-gallary">
                  <img src={marvel} alt="Image1" />
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="plan-banner pt-5 pb-5 bg-white">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-10 col-lg-10 col-sm-12 col-xs-6 text-center">
              <div className="gallery-heading main-heading mt-3">
                <h2>Plans + Pricing</h2>
                <p className="pt-2">
                  We do our best to keep this information as accurate as
                  possible. To see pricing plans on{" "}
                  {subscription?.subscriptionName}'s website, click the link.{" "}
                  {/* <Link
                    to={`${subscription?.manageUrl}`}
                    className="sub-link text-blue"
                  >
                    {subscription?.manageUrl?.slice(8)}
                  </Link> */}
                  <a
                    href={`${subscription?.manageUrl}`}
                    target="_blank"
                    rel="noreferrer"
                    className="sub-link text-blue"
                  >
                    {subscription?.manageUrl}
                  </a>
                </p>
              </div>
            </div>
          </div>

          {subscription?.plans?.length > 0 ? (
            <div className="row justify-content-center mt-5 pb-5">
              <div>
                <div className="plan-sub-div">
                  {/* {subscription?.plans} */}
                  {subscription?.plans?.map((plan, index) => (
                    <div key={index} className="card-plan plans-card">
                      <div className="plan-card-image mt-5">
                        <img src={planTopImage} alt="ImageforPlanCard" />
                      </div>
                      <h2 className="p-card-title mt-4 text-center">
                        {plan?.defaultBillingCycle}
                      </h2>
                      <span className="text-muted card-mute text-center d-block">
                        No lock-in contract
                      </span>
                      <div className="plan-price-status mt-5 text-center">
                        <h2>$ {plan?.defaultCost}</h2>
                        <span className=" plan-month text-center">
                          {" "}
                          {plan?.defaultBillingCycle}{" "}
                        </span>
                      </div>
                      <div className="btn-more justify-content-center mt-3 text-center">
                        <a
                          href={`${subscription?.affiliateProgram}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <span className="sub-data-load-btn">
                            <span>
                              <FontAwesomeIcon icon={faArrowRight} />
                            </span>
                          </span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center mb-5">
              "No plan information is currently available on Subdefy. Visit them
              directly here:
              <a
                href={subscription?.signUpUrl}
                className="sub-link text-blue"
                target="_blank"
                rel="noreferrer"
              >
                {subscription?.signUpUrl}
              </a>
              "
            </div>
          )}
        </div>
      </section>
      {/**************** Footer component ****************/}
      <Footer />

      {/**************** Back to top component ****************/}
      <BackToTopButton />
    </div>
  );
};

export default Service;

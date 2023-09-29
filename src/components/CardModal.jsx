import React from "react";
import Hbo from "../img/HBO-MAX.png";
import Rating from "./Rating";
import { Link, useNavigate } from "react-router-dom";
import OldModal from "./OldModal";
import { useState } from "react";
import { useAuth } from "../services/auth";
const CardModal = ({ slicedSubscription, favorite, addFavorite }) => {
  console.log(slicedSubscription);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [fetchChanges, setfetchChanges] = useState(false);
  const [secSubscription, setsecSubscription] = useState();
  // function ExtreactPriceNumber(price) {
  //   const costNumber = parseFloat(price?.replace("$", ""));
  //   return costNumber || 0;
  // }
  const { user } = useAuth();

  const AddToDashboard = (subscriptionName) => {
    if (!user?.user_id) {
      navigate("/login"); // Navigate to the login page
      return; // Stop further execution
    }
    setsecSubscription(subscriptionName);
    setShowModal(true);
  };

  return (
    <>
      {slicedSubscription?.map((subscription, index) => (
        <div className="modal-card text-center" key={index}>
          <div className="modal-info">
            <div className="card-banner" style={{ position: "relative" }}>
              <img
                className="d-card-icon w-100 fit__image"
                src={
                  subscription?.logoURL
                    ? subscription?.logoURL === "TBA"
                      ? Hbo
                      : subscription?.logoURL
                    : Hbo
                }
                alt="loading"
              />
              <div
                className="con-like favourite__icons"
                onClick={() => addFavorite(subscription?.subscriptionName)}
              >
                <label
                  htmlFor="like"
                  style={{
                    display: "unset",
                  }}
                >
                  <input
                    title="like"
                    type="checkbox"
                    className="like"
                    // defaultChecked={true}
                    // defaultChecked={favorite.some((som) => {
                    //   return som.subscription_name.includes(
                    //     sub.subscriptionName
                    //   );
                    // })}
                  />
                </label>
                <div className="checkmark">
                  {favorite.some((som) => {
                    return som.subscription_name.includes(
                      subscription.subscriptionName
                    );
                  }) ? (
                    <svg
                      viewBox="0 0 24 24"
                      className="filled"
                      xmlns="https://www.w3.org/2000/svg"
                    >
                      <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"></path>
                    </svg>
                  ) : (
                    <svg
                      viewBox="0 0 24 24"
                      className="outline"
                      xmlns="https://www.w3.org/2000/svg"
                    >
                      <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z"></path>
                    </svg>
                  )}
                </div>
              </div>
            </div>
            <div style={{ padding: "0 11px" }} className="card_details">
              <div className="card-title ">
                <h5 className="mb-0 card__name">
                  {subscription?.subscriptionName}
                </h5>
                <span
                  className="text-muted card-tag"
                  style={{
                    overflow: "hidden",
                    display: "block",
                  }}
                >
                  {subscription?.subscriptionName?.split(" ").map((word) => {
                    return `#${word}`;
                  })}
                </span>
              </div>
              <div className="ott-card-rating">
                <Rating value={parseFloat(subscription?.rating) || 0} />
              </div>
              <div className="ott__card__content mt-2">
                <p>{subscription?.subscriptionDescriptionLong}</p>
              </div>
              <div className="ott-card-btn">
                <Link
                  to={`/service/${subscription?.subscriptionName}`}
                  className="ott-card-more-btn"
                >
                  More
                </Link>
              </div>
              <div className="ott-plan-rate mt-4">
                <h6>
                  {" "}
                  {/* {ExtreactPriceNumber(subscription?.premiumSubscriptionsFrom)} */}
                  {subscription?.premiumSubscriptionsFrom || 0}
                </h6>
              </div>
              <div className="ott-bottom">
                <span
                  className="ott-footer-link cursor__pointer"
                  onClick={() => AddToDashboard(subscription?.subscriptionName)}
                >
                  Add to Dashboard +
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}

      <OldModal
        showModal={showModal}
        setShowModal={setShowModal}
        secSubscription={secSubscription}
        setsecSubscription={setsecSubscription}
        fetchChanges={fetchChanges}
        setfetchChanges={setfetchChanges}
      />
    </>
  );
};

export default CardModal;

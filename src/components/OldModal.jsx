import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import logoIcon from "../img/login-icon.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useEffect } from "react";
import { useAuth } from "../services/auth";
import { ToastContainer, toast } from "react-toastify";
import LoadingSpinner from "../components/Spinner";
import "react-toastify/dist/ReactToastify.css";
const OldModal = ({
  showModal,
  setShowModal,
  secSubscription,
  fetchChanges,
  setfetchChanges,
  setsecSubscription,
}) => {
  const [loading, setLoading] = useState(false);
  const [other, setOther] = useState(true);
  // this code is used to restricted the from selecting the past date

  const currentDate = new Date();
  const currentDateString = currentDate.toISOString().split("T")[0];

  const [subscription, setSubscription] = useState(null);

  const updateDetails = useForm();

  const { register, handleSubmit, formState, reset, setValue } = updateDetails;
  const { errors } = formState;
  const { token } = useAuth();

  const handlePlanChange = (selectedPlan) => {
    // console.log("selcted paln", selectedPlan);

    if (selectedPlan === "other") {
      setValue("cost", "");
      setValue("frequency", "");
      setOther(false);
      return;
    }
    const plan = subscription?.plans.find(
      (plan) => plan.planName === selectedPlan
    );
    setValue("plan", selectedPlan);
    // console.log(plan);
    // Update the state values for Cost and Frequency
    setValue("cost", plan?.defaultCost);
    setValue("frequency", plan?.defaultBillingCycle);
    setOther(true);
  };

  const getModalData = (subscriptionName) => {
    setLoading(true);
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_global_url}/api/get-subscription-details?name=${subscriptionName}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log("modal data", response.data.subscription);
        const subscriptionData = response.data.subscription;
        if (subscriptionData?.data?.subscription?.plans <= 0) {
          setOther(false);
        }
        setSubscription(subscriptionData);
        setValue("subscriptionName", subscriptionData.subscriptionName);
        setValue("exampleInputtitle", subscriptionData.category);
        setValue("exampleFormControlDate", subscriptionData.next_payment_due);
        // console.log("subscription data on select", subscriptionData);
      })
      .catch((error) => {
        // console.log(error);
        toast.error(error.response.data.message);
        handleModalHide();
      })
      .finally(() => {
        setsecSubscription("");
        setLoading(false);
      });
  };

  const AddSubsScriptionBySelect = (data, e) => {
    setLoading(true);
    e.preventDefault();
    const {
      exampleInputtitle,
      exampleInputPlan,
      exampleFormControlDate,
      cost,
      frequency,
      subscriptionName,
      exampleInputPlanother,
    } = data;

    const requestData = {
      subscription_name: subscriptionName,
      category: exampleInputtitle,
      cost: cost,
      frequency: frequency,
      next_payment_due: exampleFormControlDate,
      plan: exampleInputPlanother ? exampleInputPlanother : exampleInputPlan,
    };

    // return console.log("request Data", requestData);

    axios
      .post(
        `${process.env.REACT_APP_global_url}/api/store-user-subscription`,
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        // console.log("subscription data", JSON.stringify(response.data));
        if (!response.data.status) {
          toast.error(response.data.message);
          return setShowModal(false);
        }
        toast.success(response.data.message);
        setfetchChanges(!fetchChanges);
        return setShowModal(false);
      })
      .catch((error) => {
        // console.log(error);
        return toast.error(error.response.data.message);
      })
      .finally(() => {
        setLoading(false);
        reset();
        return setShowModal(false);
      });
  };

  // clear the modal value when ever they it closed

  const handleModalHide = () => {
    // Clear input values when the modal is closed
    setOther(true);
    reset();
    setShowModal(false);
  };

  useEffect(() => {
    if (secSubscription) {
      getModalData(secSubscription);
      // console.log("subscription", secSubscription);
    }
  }, [secSubscription]);
  return (
    <>
      <Modal
        show={showModal}
        onHide={handleModalHide}
        centered
        id="modal_parent1"

        // aria-labelledby="exampleModalToggleLabel2"
        // tabIndex="-1"
      >
        <Modal.Body>
          <div className="modal_spinner">
            <LoadingSpinner loading={loading} />
          </div>
          <div className="md-two-head text-center">
            <p>SUBSCRIPTION</p>
          </div>
          <div className="modal-two-cnt-f mt-4">
            <form
              className="sec-mod-form"
              onSubmit={handleSubmit(AddSubsScriptionBySelect)}
            >
              <div className="form-group mb-3 mt-2">
                <div className="form-row d-flex text-end">
                  <label
                    className="form-head cst-mrg font-italic"
                    htmlFor="subscriptionName"
                  >
                    Subscription
                  </label>
                  <div className="select-group h-40">
                    <input
                      className="form-control cst-modal-input"
                      id="subscriptionName"
                      type="text"
                      aria-describedby="title"
                      readOnly
                      {...register("subscriptionName")}
                    />
                  </div>
                </div>
              </div>
              <div className="form-group mb-3 mt-2">
                <div className="form-row d-flex text-end">
                  <label
                    className="form-head cst-mrg font-italic"
                    htmlFor="exampleInputtitle"
                  >
                    Category
                  </label>
                  <div className="select-group h-40 ">
                    <input
                      className="form-control cst-modal-input"
                      id="exampleInputtitle"
                      type="text"
                      readOnly
                      aria-describedby="title"
                      {...register("exampleInputtitle")}
                    />
                  </div>
                </div>
              </div>
              <div className="form-group mb-3 mt-2">
                <div className="form-row d-flex text-end">
                  <label
                    className="form-head cst-mrg font-italic"
                    htmlFor="exampletext"
                  >
                    Plan
                  </label>
                  <div className="select-group h-40">
                    <select
                      className="form-control cst-modal-input"
                      id="exampleInputPlan"
                      aria-describedby="plan"
                      {...register("exampleInputPlan")}
                      onChange={(e) => {
                        const selectedPlan = e.target.value;
                        handlePlanChange(selectedPlan);
                      }}
                    >
                      <option key="tutjjtk">Select a plan</option>
                      {subscription?.plans?.map((plan, index) => (
                        <option value={plan.planName} key={plan.id}>
                          {plan.planName}
                        </option>
                      ))}
                      <option value="other" key={"olo"}>
                        Other
                      </option>
                    </select>
                    <span className="error-div">
                      {errors.exampleInputPlan?.message}
                    </span>
                  </div>
                </div>
              </div>
              {/* Other plan option */}
              {other ? (
                ""
              ) : (
                <div className="form-group mb-3 mt-2">
                  <div className="form-row d-flex text-end">
                    <label
                      className="form-head cst-mrg font-italic"
                      htmlFor="exampletext"
                    >
                      Other Plan
                    </label>
                    <div className="select-group h-40">
                      <input
                        className="form-control cst-modal-input"
                        id="exampleInputPlanother"
                        aria-describedby="plan"
                        {...register("exampleInputPlanother", {
                          required: {
                            value: true,
                            message: "Plan is Required",
                          },
                        })}
                        placeholder="eg. Standard"
                      />
                      <span className="error-div">
                        {errors.exampleInputPlanother?.message}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div className="form-group mb-3 mt-2">
                <div className="form-row d-flex text-end">
                  <label
                    className="form-head cst-mrg font-italic"
                    htmlFor="secondCost"
                  >
                    Cost
                  </label>
                  <div className="select-group h-40 dollar_parent">
                    <span className="input-doolar">$</span>
                    <input
                      className="form-control cst-modal-input"
                      id="secondCost"
                      type="text"
                      readOnly={other}
                      aria-describedby="title"
                      placeholder="eg. $ 15.50"
                      {...register("cost", {
                        required: {
                          value: true,
                          message: "Cost is Required",
                        },
                      })}
                      style={{ paddingLeft: "24px" }}
                    />
                    <span className="error-div">{errors.cost?.message}</span>
                  </div>
                </div>
              </div>
              <div className="form-group mb-3 mt-2">
                <div className="form-row d-flex text-end">
                  <label
                    className="form-head cst-mrg font-italic"
                    htmlFor="secondFrequency"
                  >
                    Frequency
                  </label>
                  <div className="select-group h-40 ">
                    <input
                      className="form-control cst-modal-input"
                      id="secondFrequency"
                      type="text"
                      aria-describedby="title"
                      readOnly={other}
                      placeholder="eg. Monthly"
                      {...register("frequency", {
                        required: {
                          value: true,
                          message: "Frequency is Required",
                        },
                      })}
                    />
                    <span className="error-div">
                      {errors.frequency?.message}
                    </span>
                  </div>
                </div>
              </div>
              <div className="form-group mb-3 mt-2">
                <div className="form-row d-flex text-end">
                  <label
                    className="form-head cst-mrg font-italic"
                    htmlFor="exampletext"
                  >
                    Next Payment Due
                  </label>
                  <div className="select-group h-40">
                    <input
                      type="date"
                      className="form-control w_30 w-mb-42 cst-modal-input"
                      id="exampleFormControlDate"
                      {...register("exampleFormControlDate", {
                        required: {
                          value: true,
                          message: "Next Payment Data Is Required",
                        },
                      })}
                      min={currentDateString}
                      max="2040-12-31"
                    />
                    <span className="error-div">
                      {errors.exampleFormControlDate?.message}
                    </span>
                  </div>
                </div>
              </div>
              <div className="form-group mt-3 mt-2">
                <div className="modal-footer justify-content-center">
                  <button className="btn btn-primary " id="modal-btn">
                    Complete
                  </button>
                </div>
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-content-center mt-2 mb-3">
          <img className="w-94px" src={logoIcon} alt="loading" />
        </Modal.Footer>
      </Modal>
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
      <ToastContainer />{" "}
    </>
  );
};

export default OldModal;

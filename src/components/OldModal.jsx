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
  // this code is used to restricted the from selecting the past date

  const currentDate = new Date();
  const currentDateString = currentDate.toISOString().split("T")[0];

  const [subscription, setSubscription] = useState(null);
  const updateDetails = useForm();

  const { register, handleSubmit, formState, reset, setValue } = updateDetails;
  const { errors } = formState;
  const { token } = useAuth();

  const handlePlanChange = (selectedPlan) => {
    console.log(selectedPlan);
    // Find the selected plan object from the plans array
    const plan = subscription?.plans.find(
      (plan) => plan.planName === selectedPlan
    );
    setValue("plan", selectedPlan);
    console.log(plan);
    console.log(plan);
    // Update the state values for Cost and Frequency
    setValue("cost", plan?.defaultCost);
    setValue("frequency", plan?.defaultBillingCycle);
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
        setSubscription(subscriptionData);
        setValue("subscriptionName", subscriptionData.subscriptionName);
        setValue("exampleInputtitle", subscriptionData.category);
        setValue("exampleFormControlDate", subscriptionData.next_payment_due);
        console.log("subscription data on select", subscriptionData);
      })
      .catch((error) => {
        console.log(error);
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
    } = data;

    const requestData = {
      subscription_name: subscriptionName,
      category: exampleInputtitle,
      cost: cost,
      frequency: frequency,
      next_payment_due: exampleFormControlDate,
      plan: exampleInputPlan,
    };

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
        console.log(error);
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
                      // value="Netflix"
                      // value={selectedSubscription?.subscriptionName}
                      {...register("subscriptionName")}
                      // {...registerSecond("subscriptionName", {
                      //   value: selectedSubscription?.subscriptionName,
                      // })}
                      // placeholder="eg. Netflix"
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
                      // value={selectedSubscription?.category}
                      {...register("exampleInputtitle")}

                      // {...registerSecond("subscriptionName", {
                      //   value: selectedSubscription?.category,
                      // })}
                      // placeholder="eg. Entertainment"
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
                      <option>Select a plan</option>
                      {/* Empty option */}
                      {subscription?.plans?.map((plan, index) => (
                        <option value={plan.planName} key={plan.id}>
                          {plan.planName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
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
                      readOnly
                      aria-describedby="title"
                      // value="$ 15.50"
                      // placeholder="eg. $ 15.50"{}
                      {...register("cost", {
                        // pattern: {
                        //   value: /^-?\d+(\.\d+)?$/,
                        //   message: "Invalid Number",
                        // },

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
                      readOnly
                      // value="Monthly"
                      // placeholder="eg. Monthly"
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
                      // value="2023-07-19"
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
                  <button
                    className="btn btn-primary "
                    id="modal-btn"
                    // data-bs-target="#"
                    // data-bs-toggle="modal"
                    // data-bs-dismiss="modal"
                  >
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

import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import logoIcon from "../img/login-icon.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useEffect } from "react";
import { useAuth } from "../services/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
// import { setCategory } from "../features/categoriesSlice";
const EditModal = ({
  editSubscription,
  showEditModal,
  setShowEditModal,
  fetchChanges,
  setfetchChanges,
}) => {
  const categories = useSelector((state) => state.category);
  // this code is used to restricted the from selecting the past date
  const currentDate = new Date();
  const currentDateString = currentDate.toISOString().split("T")[0];

  const [subscription, setSubscription] = useState(editSubscription);
  const { register, handleSubmit, formState, setValue } = useForm();
  const { errors } = formState;

  const { token } = useAuth();

  // const handlePlanChange = (selectedPlan) => {
  //   console.log(selectedPlan);

  //   const plan = subscription?.plans.find(
  //     (plan) => plan.planName === selectedPlan
  //   );
  //   setValue("plan", selectedPlan);
  //   console.log(plan);
  //   console.log(plan);

  //   setValue("cost", plan?.defaultCost);
  //   setValue("frequency", plan?.defaultBillingCycle);
  // };

  const handleSubscriptionUpdate = (data, e) => {
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
      plan: exampleInputPlan || "basic",
      user_subscription_id: editSubscription.id,
    };
    // console.log(requestData);

    axios
      .post(
        `${process.env.REACT_APP_global_url}/api/update-user-subscription`,
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
        } else {
          toast.success(response.data.message);
        }
        setfetchChanges(!fetchChanges);
        return setShowEditModal(false);
      })
      .catch((error) => {
        // console.log(error);
        return toast.error(error.response.data.message);
      });
  };

  useEffect(() => {
    // console.log(editSubscription);
    setSubscription(editSubscription);
    // console.log(editSubscription);
    if (editSubscription) {
      setValue("exampleInputtitle", editSubscription.category);
      setValue("subscriptionName", editSubscription.subscription_name);
      setValue("cost", editSubscription.cost);
      setValue("frequency", editSubscription.frequency);
      setValue("exampleInputPlan", editSubscription.plan);
      setValue("exampleFormControlDate", editSubscription.next_payment_due);
    }
  }, [editSubscription, subscription]);
  return (
    <>
      <Modal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        centered
        id="editModal"
        // aria-labelledby="exampleModalToggleLabel2"
        // tabIndex="-1"
      >
        <Modal.Body>
          <div className="md-two-head text-center">
            <p>EDIT SUBSCRIPTION</p>
          </div>
          <div className="modal-two-cnt-f mt-4">
            <form
              className="sec-mod-form"
              onSubmit={handleSubmit(handleSubscriptionUpdate)}
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
                      // value={subscription?.subscriptionName}
                      type="text"
                      aria-describedby="title"
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
                    <select
                      name=""
                      id="exampleInputtitle"
                      // onClick={getCategory}
                      className="form-control cst-modal-input"
                      {...register("exampleInputtitle", {
                        // required: {
                        //   value: true,
                        //   message: "Category is Required",
                        // },
                      })}
                    >
                      <option value={editSubscription?.category}>
                        {editSubscription?.category}
                      </option>

                      {categories?.map((category, index) => (
                        <option
                          key={index}
                          value={category.name}
                          style={{ color: "black" }}
                        >
                          {category?.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              {editSubscription?.plan && (
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
                        // onChange={(e) => {
                        //   const selectedPlan = e.target.value;
                        //   handlePlanChange(selectedPlan);
                        // }}
                      >
                        <option>{editSubscription?.plan}</option>
                        <option value="annual">Basic</option>
                        <option value="standard">Standared HD</option>
                        <option value="premium">Premium Ultra HD</option>
                        {/* Empty option
                      {subscription?.plans?.map((plan, index) => (
                        <option value={plan.planName} key={plan.id}>
                          {plan.planName}
                        </option>
                      // ))} */}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              <div className="form-group mb-3 mt-2">
                <div className="form-row d-flex text-end ">
                  <label
                    className="form-head cst-mrg font-italic"
                    htmlFor="cost"
                  >
                    Cost
                  </label>
                  <div className="select-group h-40 dollar_parent">
                    <span className="input-doolar">$</span>
                    <input
                      className="form-control cst-modal-input"
                      id="cost"
                      type="text"
                      aria-describedby="title"
                      {...register("cost", {
                        pattern: {
                          value: /^-?\d+(\.\d+)?$/,
                          message: "Invalid Number",
                        },
                        required: {
                          value: true,
                          message: "Cost  Required",
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
                    <select
                      id="frequency"
                      className="form-control cst-modal-input"
                      {...register("frequency", {
                        required: {
                          value: true,
                          message: "Frequency is Required",
                        },
                      })}
                    >
                      <option>select a plan</option>
                      {/* <option value="weekly">Weekly</option> */}
                      <option value="monthly">Monthly</option>
                      <option value="half yearly">Half Yearly</option>
                      <option value="quarterly">Quarterly</option>
                      <option value="yearly">Yearly</option>
                    </select>
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
                      {...register("exampleFormControlDate")}
                      min={currentDateString}
                      max="2040-12-31"
                    />
                  </div>
                </div>
              </div>
              <div className="form-group mt-3 mt-2">
                <div className="modal-footer justify-content-center">
                  <button className="btn btn-primary">Complete</button>
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

export default EditModal;

import React from "react";
import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";
import Footer from "../components/Footer";
import logoIcon from "../img/login-icon.png";
import plus from "../img/plus.png";
import { useState } from "react";
import { useAuth } from "../services/auth";
import EventCalendar from "../components/EventCalendar";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import OldModal from "../components/OldModal";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import LineChart from "../components/LineChart";
import LoadingSpinner from "../components/Spinner";
import DupPie from "../app/dupPie";
const Calendar = () => {
  const [loading, setLoading] = useState(false);
  const categories = useSelector((state) => state.category);
  const currentDate = new Date();
  const currentDateString = currentDate.toISOString().split("T")[0];
  const [showModal, setShowModal] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showmodal1, setshowModal1] = useState(false);
  const [changes, setchanges] = useState(false);
  const [error, setError] = useState(false);

  const [categoriesLoder, setCategoriesLoder] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [subscriptions, setSubscriptions] = useState();

  const [secSubscription, setsecSubscription] = useState();

  const [fetchChanges, setfetchChanges] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [apiData, setApiData] = useState([]);
  const HandleModal = () => {
    setShowModal(true);
  };
  const handleButtonClick = () => {
    setButtonClicked((prevState) => !prevState);
  };
  const { token } = useAuth();

  const updateDetails = useForm();
  const modal1 = useForm();
  const { register: modal1Register, reset: modal1Reset } = modal1;

  const { register, handleSubmit, formState, reset, setValue } = updateDetails;

  const { errors } = formState;

  const getSelectedSubscription = (selected) => {
    setsecSubscription(selected);
    modal1Reset();
    setshowModal1(false);
    setApiData([]);
    setInputValue("");
    return setShowModal(true);
  };

  // function to get subscription name
  const getSubscriptionName = (searchTerm) => {
    // console.log("api call");
    let config = {
      method: "get",
      url: `${process.env.REACT_APP_global_url}/api/get-subscription-names?name=${searchTerm}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .request(config)
      .then((response) => {
        setApiData(response.data.subscriptions);
        setError(false);
      })
      .catch((error) => {
        setApiData([]);
        setError(true);
        setValue("subscription", searchTerm);
      });
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    // console.log(value);

    getSubscriptionName(value);
  };

  // function to get all subscription of user
  const getUserSubscription = () => {
    setLoading(true);
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_global_url}/api/get-user-subscriptions`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .request(config)
      .then((response) => {
        setSubscriptions(response.data.subscriptions);
      })
      .catch((error) => {
        // console.log(error);
        return toast.error(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  //function to add new subscription
  const AddNewSubscription = (data, e) => {
    setLoading(true);
    e.preventDefault();
    const { subscription, cost, frequency, category, nextPayment } = data;

    let reqData = JSON.stringify({
      subscription_name: subscription,
      category: category,
      cost: cost,
      frequency: frequency,
      next_payment_due: nextPayment,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_global_url}/api/store-subscription-byuser`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: reqData,
    };
    axios
      .request(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        getUserSubscription();
        setShowModal3(false);
        setchanges(!changes);
        if (response.data.status === false) {
          return toast.error(response.data.message);
        }
        return toast.success("Subscription Added Successfully");
      })
      .catch((error) => {
        // console.log(error);
        return toast.error(error.data.message);
      })
      .finally(() => {
        setLoading(false);
        reset();
      });
  };

  const OpenModal3 = () => {
    setError(false);
    setshowModal1(false);
    modal1Reset();
    setInputValue("");
    setApiData([]);
    return setShowModal3(true);
  };

  // clear the modal value when ever they it closed
  const handleModalHide = () => {
    // Clear input values when the modal is closed
    reset();
    setShowModal3(false);
  };

  //clare the modal value of modal 1
  const handleModal1Hide = () => {
    setApiData([]);
    setInputValue("");
    modal1Reset(); // Reset the form fields when the modal is closed
    return setshowModal1(false);
  };

  useEffect(() => {
    getUserSubscription();
    // console.log(subscriptions);
  }, [fetchChanges]);

  return (
    <>
      <Navbar onButtonClick={handleButtonClick} />
      <SideBar
        buttonClicked={buttonClicked}
        onButtonClick={handleButtonClick}
      />
      <div className="wishListLoder">
        <LoadingSpinner loading={loading} />
      </div>
      <main className="app-content ">
        <section className="upload-file-sec">
          <div className="row justify-content-center my-md">
            <div className="col-md-9 selection-col">
              <div className="row justify-content-center my-md">
                <div className="col-md-12">
                  <div className="sm-border-box mx-auto">
                    <div
                      className="child-cnt text-center"
                      onClick={() => setshowModal1(true)}
                    >
                      <img
                        className="w-30px mb-1 mt-3"
                        src={plus}
                        alt="loading"
                      />
                      <p className="text-d-blue">ADD SUBSCRIPTION</p>
                    </div>
                  </div>
                </div>

                <section className="profile-setings mt-4">
                  <div
                    className="row justify-content-center tabel_container"
                    style={{ marginLeft: "9px" }}
                  >
                    <div className="col-md-11 selection-col">
                      <div className="accordion" id="accordionExample">
                        <div className="accordion-item calendar_area">
                          <EventCalendar
                            changes={changes}
                            fetchChanges={fetchChanges}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <div className=" mt-20  mb-3 col-lg-9 col-sm-12 col-md-9 col-xl-8 col-xs-12 d-none-sm">
                  <div className="graph-head mb-2">
                    <h6>OCTOBER CASH FLOW - CURRENT VS SUBDEFY PAY</h6>
                  </div>
                  <div className="line-cart-area">
                    <LineChart subscriptions={subscriptions} />
                  </div>
                  <div className="line-chart-cntrl mt-1">
                    <div className="l-chart-cntnt justify-content-center d-flex ">
                      <div className="form-check mx-2">
                        <input
                          className="line-for-radio l-chart-radio-i "
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault"
                        />
                        <label
                          className="form-check-label l-chart-label "
                          htmlFor="flexRadioDefault"
                        >
                          CURRENT CASH FLOW
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="line-for-radio l-chart-radio-sub"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault2"
                        />
                        <label
                          className="form-check-label l-chart-label"
                          htmlFor="flexRadioDefault2"
                        >
                          CASH FLOW WITH SUBDEFY PAY
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3 sidebox-col px-0 py-0">
              <DupPie subscriptions={subscriptions} />
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <Modal show={showmodal1} onHide={handleModal1Hide} centered>
        <div className="dfdf">
          <Modal.Body>
            <div className="text-center">
              <p>Search Subscription</p>
              <form className="select-subscription-form" autoComplete="off">
                <div className="form-group mb-2 mt-2">
                  <div className="autocomplete">
                    <input
                      className="form-control cst-modal-input w-300"
                      type="text"
                      name="mysub"
                      id="inputvalue"
                      placeholder="Netflix, Calm, etc."
                      {...modal1Register("inputvalue")}
                      value={inputValue}
                      onChange={handleInputChange}
                    />

                    {error ? (
                      <span className="subscriptionList_error">
                        Click Add New
                      </span>
                    ) : (
                      ""
                    )}

                    {inputValue &&
                      inputValue.length > 0 &&
                      apiData &&
                      apiData?.length > 0 && (
                        <div className="subscriptionList">
                          {apiData?.map((item, index) => (
                            <div
                              key={index}
                              className="Subscription"
                              onClick={() => getSelectedSubscription(item)}
                            >
                              {item}
                            </div>
                          ))}
                        </div>
                      )}
                  </div>
                </div>
              </form>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <span className="text-muted">Add A New Subscription</span>
            <button className="btn one-mod-sub" onClick={OpenModal3}>
              Add New
              <FontAwesomeIcon icon={faPlus} style={{ marginLeft: "6px" }} />
            </button>
          </Modal.Footer>{" "}
        </div>
      </Modal>

      <OldModal
        showModal={showModal}
        setShowModal={setShowModal}
        secSubscription={secSubscription}
        setsecSubscription={setsecSubscription}
        fetchChanges={fetchChanges}
        setfetchChanges={setfetchChanges}
      />

      <Modal
        show={showModal3}
        onHide={handleModalHide}
        centered
        id="modal_parent1"
      >
        <Modal.Body>
          <div className="modal_spinner">
            <LoadingSpinner loading={loading} />
          </div>
          <div className="">
            <div className="md-two-head text-center">
              <p>CREATE NEW SUBSCRIPTION</p>
            </div>
            <div className="modal-two-cnt-f mt-4">
              <form
                className="sec-mod-form"
                onSubmit={handleSubmit(AddNewSubscription)}
              >
                <div className="form-group mb-3 mt-2">
                  <div className="form-row d-flex text-end">
                    <label
                      className="form-head cst-mrg font-italic"
                      htmlFor="subscription"
                    >
                      Subscription
                    </label>

                    <div className="select-group h-40">
                      <input
                        className="form-control cst-modal-input"
                        id="subscription"
                        type="text"
                        aria-describedby="title"
                        placeholder="Netflix"
                        {...register("subscription", {
                          required: {
                            value: true,
                            message: "Subscription is Required",
                          },
                        })}
                      />
                      <span className="error-div">
                        {errors.subscription?.message}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="form-group mb-3 mt-2">
                  <div className="form-row d-flex text-end">
                    <label
                      className="form-head cst-mrg font-italic"
                      htmlFor="category"
                    >
                      Category
                    </label>

                    <div className="select-group h-40 ">
                      <select
                        name=""
                        id="category"
                        className="form-control cst-modal-input"
                        {...register("category", {
                          required: {
                            value: true,
                            message: "Category is Required",
                          },
                        })}
                      >
                        <option value="">Select Category</option>

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

                      <span className="error-div">
                        {errors.category?.message}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="form-group mb-3 mt-2">
                  <div className="form-row d-flex text-end">
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
                        style={{ paddingLeft: "24px" }}
                        aria-describedby="title"
                        placeholder="15.50"
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
                      />
                      <span className="error-div">{errors.cost?.message}</span>
                    </div>
                  </div>
                </div>
                <div className="form-group mb-3 mt-2">
                  <div className="form-row d-flex text-end">
                    <label
                      className="form-head cst-mrg font-italic"
                      htmlFor="frequency"
                    >
                      Frequency
                    </label>

                    <div className="select-group">
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
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="half yearly">Half Yearly</option>
                        <option value="quarterly">Quarterly</option>
                        <option value="yearly">Yearly</option>
                      </select>
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
                      htmlFor="nextPayment"
                    >
                      Next Payment Due
                    </label>

                    <div className="select-group h-40">
                      <input
                        type="date"
                        className="form-control w_30 w-mb-42 cst-modal-input"
                        id="nextPayment"
                        min={currentDateString}
                        max="2040-12-31"
                        {...register("nextPayment", {
                          required: {
                            value: true,
                            message: "NextPayment date is Required",
                          },
                        })}
                      />
                      <span className="error-div">
                        {errors.nextPayment?.message}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="modal-footer justify-content-center">
                  <button
                    className="btn btn-primary"
                    type="submit"
                    id="modal-btn"
                  >
                    Complete
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Modal.Body>
        <div className="modal-footer justify-content-center mt-2 mb-3">
          <img className="w-94px" src={logoIcon} alt="loading" />
        </div>
      </Modal>
    </>
  );
};

export default Calendar;

import React from "react";
import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";
import Footer from "../components/Footer";
import logoIcon from "../img/login-icon.png";
import plus from "../img/plus.png";
import { useState } from "react";
import { useAuth } from "../services/auth";

import { useForm } from "react-hook-form";
import axios from "axios";
import { Modal } from "react-bootstrap";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import Tabel from "../components/Tabel";
import OldModal from "../components/OldModal";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
// import { RiseLoader } from "react-spinners";
// import EditModal from "../components/EditModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import LineChart from "../components/LineChart";
// import { PieChart } from "../components/PieChar";
import LoadingSpinner from "../components/Spinner";
import PieCharts from "../components/PieCharts";
// import TesgingTabel from "../TestingTabel";
const Manage = () => {
  const [loading, setLoading] = useState(false);
  // this code is used to restricted the from selecting the past date
  const categories = useSelector((state) => state.category);
  const currentDate = new Date();
  const currentDateString = currentDate.toISOString().split("T")[0];
  const [showModal, setShowModal] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showmodal1, setshowModal1] = useState(false);
  const [error, setError] = useState(false);
  // const [editModal, setEditModal] = useState(false);
  // const initialSelectedSubscription = {
  //   subscriptionName: "",
  //   category: "",
  //   plans: [],
  // };

  // const [categories, setCategories] = useState([]);
  const [categoriesLoder, setCategoriesLoder] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [subscriptions, setSubscriptions] = useState();

  const [secSubscription, setsecSubscription] = useState();

  const [fetchChanges, setfetchChanges] = useState(false);
  // const [dataAdded, setDataAdded] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [apiData, setApiData] = useState([]);
  // const [selectedItem, setSelectedItem] = useState(null);

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
  //seeting the default value to second modal
  // const secondModal = useForm();
  const { register, handleSubmit, formState, reset, setValue } = updateDetails;
  // const {
  //   register: registerSecond,
  //   handleSubmit: handleSubmitSecond,
  //   formState: formStateSecond,
  //   setValue: setValueSecond,
  // } = secondModal;
  const { errors } = formState;

  //getSelectedSubscription details

  const getSelectedSubscription = (selected) => {
    setsecSubscription(selected);
    modal1Reset();
    setshowModal1(false);
    setApiData([]);
    setInputValue("");
    return setShowModal(true);
  };

  //function to get list of category

  const getCategory = () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_global_url}/api/get-categories`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .request(config)
      .then((response) => {
        let categorie = response.data.categories.map((item, index) => {
          return item.name;
        });
        console.log(categorie);
        // setCategories(categorie);
        setCategoriesLoder(false);
      })
      .catch((error) => {
        console.log(error);
        return toast.error(error.response.data.message);
      });
  };

  // function to get subscription name
  const getSubscriptionName = (searchTerm) => {
    console.log("api call");
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
        // console.log("list", response.data.subscriptions);
      })
      .catch((error) => {
        setApiData([]);
        setError(true);
        // return toast.error(error.response.data.message);
      });
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    console.log(value);

    getSubscriptionName(value);
  };

  // function to get all subscription of user
  const getUserSubscription = () => {
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
        // console.log(subscriptions);
      })
      .catch((error) => {
        console.log(error);
        return toast.error(error.message);
      });
  };

  //function to add new subscription
  const AddNewSubscription = (data, e) => {
    setLoading(true);
    e.preventDefault();
    const { subscription, cost, frequency, category, nextPayment } = data;

    // console.log(data);
    let reqData = JSON.stringify({
      subscription_name: subscription,
      category: category,
      cost: cost,
      frequency: frequency,
      next_payment_due: nextPayment,
    });

    // return console.log(reqData, categories);
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
        console.log(JSON.stringify(response.data));
        // setDataAdded(!dataAdded); //to re -fetch the data from the database;
        getUserSubscription();
        setShowModal3(false);
        return toast.success(response.data.message);
      })
      .catch((error) => {
        console.log(error);
        return toast.success(error.data.message);
      })
      .finally(() => {
        setLoading(false);
        reset();
      });
  };

  const OpenModal3 = () => {
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
    modal1Reset(); // Reset the form fields when the modal is closed
    return setshowModal1(false);
  };

  useEffect(() => {
    getUserSubscription();
    console.log(subscriptions);
  }, [fetchChanges]);

  return (
    <>
      <Navbar onButtonClick={handleButtonClick} />
      <SideBar
        buttonClicked={buttonClicked}
        onButtonClick={handleButtonClick}
      />
      <main className="app-content ">
        <section className="upload-file-sec">
          <div className="row justify-content-center">
            {/* <!-- <div className="col-md-2 empty-div"></div> --> */}
            <div className="col-md-9 selection-col">
              <div className="row justify-content-center">
                <div className="col-md-12">
                  <div className="sm-border-box mx-auto">
                    <div
                      className="child-cnt text-center"
                      // data-bs-toggle="modal"
                      // href="#exampleModalToggle"
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
                  {/* <!-- table with data --> */}
                </div>
                <Tabel
                  subscriptions={subscriptions}
                  // getSelectedSubscription={getSelectedSubscription}
                  // setEditSubscription={setEditSubscription}
                  // setEditModal={setEditModal}
                  setfetchChanges={setfetchChanges}
                  fetchChanges={fetchChanges}
                />

                {/* <!--bottom-graph section start--> */}
                <div className=" mt-20  mb-3 col-lg-9 col-sm-12 col-md-9 col-xl-6 col-xs-12 mx-auto d-none-sm">
                  <div className="graph-head mb-2">
                    <h6>OCTOBER CASH FLOW - CURRENT VS SUBDEFY PAY</h6>
                  </div>
                  <div className="line-cart-area bg-white">
                    <LineChart />
                    {/* <canvas
                      id="linechart"
                      className="chartjs bg-white mb-2"
                    ></canvas> */}
                  </div>
                  <div className="line-chart-cntrl mt-1">
                    <div className="l-chart-cntnt justify-content-center d-flex ">
                      <div className="form-check mx-2">
                        <input
                          className="form-check-input l-chart-radio-i "
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault"
                        />
                        <label
                          className="form-check-label l-chart-label "
                          htmlFor="flexRadioDefault2"
                        >
                          CURRENT CASH FLOW
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input l-chart-radio-sub"
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
              {/* <!-- :: bottom-graph section end  --> */}
            </div>
            {/* <!-- 2nd column sidebox --> */}
            <div className="col-md-3 sidebox-col px-0 py-0">
              <div className="sub-box">
                <div className="sub-box-contnt">
                  <div className="pt-4 main-sub-head text-center">
                    <p>
                      <strong>Recurring Expenditure by Month</strong>
                    </p>
                  </div>
                  <div className="canvas-box cst-p">
                    {/* <!--<canvas id="myChart"></canvas>--> */}
                    <div
                      className="set-size charts-container"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <PieCharts />
                      {/* <div className="pie-wrapper progress-95 style-2">
                        <span className="label">
                          <span className="fs12 graph-t-data-active ">
                            Entertainment
                          </span>
                        </span>
                        <span className="label fs-12 mt-3">0 %</span>
                        <div className="pie">
                          <div className="left-side half-circle"></div>
                          <div className="right-side half-circle"></div>
                        </div>
                        <div className="shadow"></div>
                      </div> */}
                    </div>
                    {/* <PieChart /> */}
                  </div>
                  <div className="canvas-data">
                    <div className="graph-data-table">
                      <table className="br-none mx-auto w-wide-80">
                        <thead>
                          <tr className="br-bottom">
                            <th></th>
                            <th className="bar-graph-t-head">OCT 2023</th>
                            <th className="graph-t-data">$ 0</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="br-none  ">
                            <td>
                              <span className="res-head">
                                {/* <!--<img className="w-20px" src="img/color-box.png">--> */}
                                <div className="small-color-box"></div>
                              </span>
                            </td>
                            <td className="res-head graph-t-data-active w-250">
                              ENTERTAINMENT
                            </td>
                            <td className="graph-t-data">
                              <span className="res-head ">$ 0</span>
                            </td>
                          </tr>
                          <tr className="br-none">
                            <td>
                              <span className="res-head">
                                {/* <!--<img className="w-20px" src="img/color-box.png">--> */}
                                <div className="small-color-box-2"></div>
                              </span>
                            </td>
                            <td className="graph-t-data-unactive w-250">
                              <span className="">HEALTH/FITNESS</span>
                            </td>
                            <td className="graph-t-data">
                              <span className="res-head">$ 0</span>
                            </td>
                          </tr>
                          <tr className="br-none">
                            <td>
                              <span className="res-head">
                                {/* <!--<img className="w-20px" src="img/color-box.png">--> */}
                                <div className="small-color-box-3"></div>
                              </span>
                            </td>
                            <td className="graph-t-data-unactive w-250">
                              <span className="">EDUCATION</span>
                            </td>
                            <td className="graph-t-data">
                              <span className="res-head">$ 0</span>
                            </td>
                          </tr>
                          <tr className="br-none">
                            <td>
                              <span className="res-head">
                                {/* <!--<img className="w-20px" src="img/color-box.png">--> */}
                                <div className="small-color-box-4"></div>
                              </span>
                            </td>
                            <td className="graph-t-data-unactive w-250">
                              <span className="">FOOD AND BEVERAGES</span>
                            </td>
                            <td className="graph-t-data">
                              <span className="res-head">$ 0</span>
                            </td>
                          </tr>
                          <tr className="br-none">
                            <td>
                              <span className="res-head">
                                {/* <!--<img className="w-20px" src="img/color-box.png">--> */}
                                <div className="small-color-box-5"></div>
                              </span>
                            </td>
                            <td className="graph-t-data-unactive w-250">
                              <span className="">TECHNOLOGY / SOFTWARE</span>
                            </td>
                            <td className="graph-t-data">
                              <span className="res-head">$ 0</span>
                            </td>
                          </tr>
                          <tr className="br-none">
                            <td>
                              <span className="res-head">
                                {/* <!--<img className="w-20px" src="img/color-box.png">--> */}
                                <div className="small-color-box-6"></div>
                              </span>
                            </td>
                            <td className="graph-t-data-unactive w-250">
                              <span className="">HOME AND LIFESTYLE</span>
                            </td>
                            <td className="graph-t-data">
                              <span className="res-head">$ 0</span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      {/* modal no 1 */}

      <Modal
        show={showmodal1}
        onHide={handleModal1Hide}
        centered
        // className="modal_dilog_1"
      >
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
                        Try Different Word!
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
            <button
              className="btn one-mod-sub"
              // onClick={() => setShowModal3(true)}
              onClick={OpenModal3}
            >
              Add New
              <FontAwesomeIcon icon={faPlus} style={{ marginLeft: "6px" }} />
            </button>
          </Modal.Footer>{" "}
        </div>
      </Modal>

      {/* edit modal  start*/}

      {/* edit modal  End*/}

      {/* <!-- ::modal no 02 --> */}

      <OldModal
        showModal={showModal}
        setShowModal={setShowModal}
        secSubscription={secSubscription}
        setsecSubscription={setsecSubscription}
        fetchChanges={fetchChanges}
        setfetchChanges={setfetchChanges}
      />
      {/* <!--:: modal 3--> */}

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
                        // onClick={getCategory}
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

                        {/* <option value="Category1"> Category1</option>
                        <option value="Category2"> Category2</option>
                        <option value="Category2">Category2</option> */}
                      </select>
                      {/* <input
                        className="form-control cst-modal-input"
                        id="category"
                        type="text"
                        aria-describedby="title"
                        placeholder="eg. Entertainment"
                        {...register("category", {
                          required: {
                            value: true,
                            message: "Category is required",
                          },
                        })}
                      /> */}
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
                        // value="$"
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
                        {/* <option value="weekly">Weekly</option> */}
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
                        // value="2023-07-19"
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
                  {/* <!-- footer image  --> */}
                </div>
              </form>
            </div>
          </div>
        </Modal.Body>
        <div className="modal-footer justify-content-center mt-2 mb-3">
          <img className="w-94px" src={logoIcon} alt="loading" />
          {/* <!-- footer image  --> */}
        </div>
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
    </>
  );
};

export default Manage;

import React, { useEffect, useState } from "react";
import { FadeLoader } from "react-spinners";
// import ActionBtn from "../img/action-btn.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import NoDataImage from "../img/Subscription-Not-Found-Monster.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useAuth } from "../services/auth";
import EditModal from "./EditModal";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useSelector } from "react-redux";

const MySwal = withReactContent(Swal);
const Tabel = ({
  subscriptions,
  // getSelectedSubscription,
  // setEditSubscription,
  // setEditModal,
  setfetchChanges,
  fetchChanges,
}) => {
  const cat = useSelector((state) => state.category);
  const { token } = useAuth();
  const [editSubscription, setEditSubscription] = useState();
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const [selectAll, setSelectAll] = useState(false);
  // const [toggle, setToggle] = useState(
  //   new Array(subscriptions?.length).fill(false)
  // );

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items per page
  const totalPages = Math.ceil(subscriptions?.length / itemsPerPage);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  // Calculate starting and ending indexes for displayed data
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, subscriptions?.length);
  const displayedSubscriptions = subscriptions?.slice(startIndex, endIndex);

  const handleDeleteSubscription = (id) => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_global_url}/api/delete-user-subscription/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .request(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        setfetchChanges(!fetchChanges);
        return toast.success(response.data.message);
      })
      .catch((error) => {
        return toast.error(error.response.data.message);
      });
  };

  // const handlePageChange = (page) => {
  //   setCurrentPage(page);
  // };

  const handleConfirm = (id, all) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        if (all === "all") {
          if (selectedRows.length <= 0) {
            return MySwal.fire(
              "Cancelled!",
              "Please Select Data to Deleted.",
              "error"
            );
          }
          handleDeleteSelected();
        } else {
          handleDeleteSubscription(id);
        }
        MySwal.fire("Confirmed!", "Your action has been completed.", "success");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        MySwal.fire("Cancelled", "Your action has been cancelled.", "error");
      }
    });
  };

  const handleCheckboxChange = (rowId) => {
    // Check if the rowId is already in the selectedRows array
    if (selectedRows.includes(rowId)) {
      // Deselect the row by removing it from the selectedRows array
      setSelectedRows(selectedRows.filter((id) => id !== rowId));
    } else {
      // Select the row by adding it to the selectedRows array
      setSelectedRows([...selectedRows, rowId]);
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]); // Deselect all rows
    } else {
      const allIds = subscriptions.map((subscr) => subscr.id);
      setSelectedRows(allIds); // Select all rows
    }
    setSelectAll(!selectAll); // Toggle the select all state
  };

  // const handleToogle = (index) => {
  //   const newToggle = [...toggle];
  //   // newToggle.fill(false);
  //   newToggle[index] = !newToggle[index];
  //   setToggle(newToggle);
  // };

  const handleDeleteSelected = () => {
    let data = JSON.stringify({
      selectedIds: selectedRows,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_global_url}/api/items/bulk-delete`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        setfetchChanges(!fetchChanges);
        setSelectedRows([]); // Clear selectedRows after deletion
        setSelectAll(false);
      })
      .catch((error) => {
        console.log(error);
      });

    // console.log(selectedRows);
    setSelectedRows([]);
  };

  const extractDayMonthName = (dateString) => {
    const date = new Date(dateString);
    const options = { weekday: "short" };
    const shortDayName = date.toLocaleDateString("en-US", options);
    const day = date.getDate();

    const options2 = { month: "short" };
    const shortMonthName = date.toLocaleDateString("en-US", options2);
    const formattedDate = `${shortDayName}, ${day} ${shortMonthName}`;
    return formattedDate;
  };

  const DefaultImag = (name) => {
    const { image } = cat.find((item) => item.name === name);
    // console.log("null image cat", image);
    return `${process.env.REACT_APP_global_url}/public/${image}`;
  };

  // const editsubscription = (subscription) => {
  //   // console.log("edit button is press with", subscription);
  //   // getSelectedSubscription(subscription);
  //   // console.log(subscription);
  //   setEditSubscription(subscription);
  //   // console.log(editSubscription);
  //   setShowEditModal(true);
  // };

  function ExtreactPriceNumber(price) {
    const costNumber = parseFloat(price.replace("$", ""));
    return costNumber;
  }

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, [editSubscription]);

  return (
    <>
      <div className="col-md-12 pr-desk-2-mob-0">
        <div className="container sub-tab-container mt-4">
          <div className="table-subs-parent table-responsive w-nowrap">
            {isLoading ? (
              <div className="spinner-container">
                <FadeLoader color="#007bff" loading={isLoading} size={15} />
              </div>
            ) : (
              <>
                <table className="table subscription-table  text-center">
                  <thead className="sub-table-head mb-2">
                    <tr>
                      <th className="c-pointer br-none">Select</th>
                      <th className="c-pointer br-none text-left">
                        Subscription Name
                      </th>
                      <th className="c-pointer br-none">Price</th>
                      <th className="c-pointer br-none">Frequency</th>
                      <th className="c-pointer br-none">Due</th>
                      <th className="c-pointer br-none">Category</th>
                      <th className="c-pointer br-none">Manage</th>
                    </tr>
                  </thead>

                  <tbody className="subs-tab-body">
                    {totalPages ? (
                      displayedSubscriptions &&
                      displayedSubscriptions?.map((subscr, index) => (
                        <tr className="" key={index}>
                          <th className=" check-table br-none">
                            <input
                              className="form-check-input tab-check"
                              type="checkbox"
                              checked={selectedRows.includes(subscr.id)}
                              onChange={() => handleCheckboxChange(subscr.id)}
                              id={`flexCheckDefault${subscr.id}`}
                            />
                          </th>
                          <td className="bg-white br-left text-left text-capitalize d-flex flex-row align-items-center">
                            <div
                              style={{
                                width: "27px",
                              }}
                              className="mx-2"
                            >
                              <img
                                className="tab-icon  "
                                src={
                                  subscr?.subscriptiondetails?.logoURL
                                    ? subscr?.subscriptiondetails?.logoURL
                                    : DefaultImag(subscr?.category)
                                }
                                alt="loading"
                              />
                            </div>

                            {subscr.subscription_name}
                          </td>
                          <td className="bg-white c-pointer br-top-bottom">
                            $ {ExtreactPriceNumber(subscr?.cost)}
                          </td>
                          <td className="bg-white c-pointer br-top-bottom wp-0 text-capitalize">
                            {subscr.frequency}
                          </td>
                          <td className="bg-white c-pointer  br-top-bottom wp-0">
                            {/* {subscr.next_payment_due} */}
                            {extractDayMonthName(subscr.next_payment_due)}
                          </td>
                          <td className="bg-white c-pointer br-top-bottom category_main">
                            <span className="mg-category my_category1 text-capitalize">
                              {subscr.category}
                            </span>
                          </td>
                          <td
                            className="bg-white c-pointer br-right"
                            style={{ width: "9vw" }}
                          >
                            <div>
                              <div
                                className=""
                                onClick={() => handleConfirm(subscr.id)}
                              >
                                <FontAwesomeIcon
                                  className="dropdown-hover"
                                  icon={faTrash}
                                  style={{ color: "grey" }}
                                ></FontAwesomeIcon>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      //
                      <tr>
                        <td colSpan="7" className="text-center">
                          <img
                            src={NoDataImage}
                            alt="no data"
                            style={{
                              /* height: fit-content; */
                              height: "50vh",
                            }}
                          />
                        </td>
                      </tr>
                    )}

                    {totalPages ? (
                      <tr>
                        <td>
                          <input
                            type="checkbox"
                            name=""
                            id=""
                            className="form-check-input tab-check"
                            checked={selectAll}
                            onChange={handleSelectAll}
                          />
                        </td>
                        <td>
                          {" "}
                          <div className="d-flex ">
                            <div className="select-all">Check all</div>
                            <div className="With-Selected">With Selected:</div>
                          </div>
                        </td>
                        <td>
                          {" "}
                          <div
                            className="delete-all"
                            onClick={() => handleConfirm(1, "all")}
                          >
                            Delete
                          </div>
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        {/* <td></td>
                      <td></td> */}
                      </tr>
                    ) : (
                      ""
                    )}
                  </tbody>
                </table>
              </>
            )}
            {/* {totalPages ? (
              <div
                className="d-flex  align-items-center selectallcontainer"
                style={{
                  marginLeft: "30px",
                }}
              >
                <input
                  type="checkbox"
                  name=""
                  id=""
                  className="form-check-input tab-check"
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
                <div className="d-flex ">
                  <div className="select-all">Check all</div>
                  <div className="With-Selected">With Selected:</div>
                  <div
                    className="delete-all"
                    onClick={() => handleConfirm(1, "all")}
                  >
                    Delete
                  </div>
                </div>
              </div>
            ) : (
              ""
            )} */}
          </div>
          <EditModal
            showEditModal={showEditModal}
            setShowEditModal={setShowEditModal}
            // setEditSubscription={setEditSubscription}
            editSubscription={editSubscription}
            fetchChanges={fetchChanges}
            setfetchChanges={setfetchChanges}
          />
        </div>

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
        <ToastContainer />
      </div>
    </>
  );
};

export default Tabel;

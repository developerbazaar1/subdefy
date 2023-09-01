import React, { useEffect, useState } from "react";
import { RiseLoader, FadeLoader } from "react-spinners";
import ActionBtn from "../img/action-btn.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import NoDataImage from "../img/No-Subscrition-2.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useAuth } from "../services/auth";
import EditModal from "./EditModal";
import Dot from "../img/dots.png";
const Tabel = ({
  subscriptions,
  // getSelectedSubscription,
  // setEditSubscription,
  // setEditModal,
  setfetchChanges,
  fetchChanges,
}) => {
  const { token } = useAuth();
  const [editSubscription, setEditSubscription] = useState();
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const [toggle, setToggle] = useState(
    new Array(subscriptions?.length).fill(false)
  );

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items per page
  const totalPages = Math.ceil(subscriptions?.length / itemsPerPage);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  // Calculate starting and ending indexes for displayed data
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, subscriptions?.length);
  const displayedSubscriptions = subscriptions?.slice(startIndex, endIndex);
  const handleDeleteSubscription = (id) => {
    if (!window.confirm("Are you sure you want to delete the subscriptions?")) {
      return;
    }
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
        console.log(JSON.stringify(response.data));
        setfetchChanges(!fetchChanges);
        return toast.success(response.data.message);
      })
      .catch((error) => {
        return toast.error(error.response.data.message);
      });
  };
  // Function to update current page
  const handlePageChange = (page) => {
    setCurrentPage(page);
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

  //Old toogle
  // const handleToogle = () => {
  //   setToggle(!toggle);
  // };

  // New toogel
  const handleToogle = (index) => {
    const newToggle = [...toggle];
    // newToggle.fill(false);
    newToggle[index] = !newToggle[index];
    setToggle(newToggle);
  };

  const handleDeleteSelected = () => {
    let data = JSON.stringify({
      selectedIds: selectedRows,
    });
    // Add confirmation dialog here if needed
    if (
      window.confirm(
        "Are you sure you want to delete the selected subscriptions?"
      )
    ) {
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
          console.log(JSON.stringify(response.data));
          setfetchChanges(!fetchChanges);
        })
        .catch((error) => {
          console.log(error);
        });
      // Clear the selectedRows state
      console.log(selectedRows);
      setSelectedRows([]);
    }
  };

  const editsubscription = (subscription) => {
    // console.log("edit button is press with", subscription);
    // getSelectedSubscription(subscription);
    console.log(subscription);
    setEditSubscription(subscription);
    console.log(editSubscription);
    setShowEditModal(true);
  };

  useEffect(() => {
    // Simulating data fetching with a timeout (replace with actual data fetching)
    setTimeout(() => {
      setIsLoading(false); // Set loading to false once data is fetched
      console.log("display subscription", totalPages);
    }, 2000); // Simulated 2-second loading time
  }, [editSubscription]);

  return (
    <>
      <div className="col-md-12 pr-desk-2-mob-0">
        <div className="container sub-tab-container mt-4">
          <div className="table-subs-parent table-responsive w-nowrap">
            {/* <!-- maintable --> */}

            {isLoading ? (
              <div className="spinner-container">
                <FadeLoader color="#007bff" loading={isLoading} size={15} />
              </div>
            ) : (
              <>
                {" "}
                <table className="table subscription-table  text-center">
                  {/* <!-- table head start from here --> */}
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
                      <th className="c-pointer br-none manage_head">Manage</th>
                    </tr>
                  </thead>
                  {/* <!-- table body data start from here --> */}
                  <tbody className="subs-tab-body">
                    {/* <!-- :: table row 01 start from here --> */}
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
                              id="flexCheckDefault"
                            />
                          </th>
                          <td className="bg-white br-left text-left text-capitalize">
                            <img
                              className="tab-icon mx-3 w-20"
                              src="https://soft.dbtechserver.online/subdefy/img/tab-icon.png"
                              alt="loading"
                            />{" "}
                            {subscr.subscription_name}
                          </td>
                          <td className="bg-white c-pointer br-top-bottom">
                            {" "}
                            {subscr.cost}
                          </td>
                          <td className="bg-white c-pointer br-top-bottom wp-0 text-capitalize">
                            {subscr.frequency}
                          </td>
                          <td className="bg-white c-pointer  br-top-bottom wp-0">
                            {subscr.next_payment_due}
                          </td>
                          <td className="bg-white c-pointer br-top-bottom category_main">
                            <span
                              href="#d"
                              className="mg-category my_category1 text-capitalize"
                            >
                              {subscr.category}
                            </span>
                          </td>
                          <td
                            className="bg-white c-pointer br-right"
                            style={{ width: "9vw" }}
                          >
                            <div>
                              <div className="toogle_div">
                                <img
                                  className="w-10px action-btn"
                                  style={{ width: "22px" }}
                                  src={Dot}
                                  alt="loading"
                                  onClick={() => handleToogle(index)}
                                />
                              </div>
                              <div style={{ position: "relative" }} id="Toogle">
                                {toggle[index] && (
                                  <div className="tabel_toogle">
                                    {/* edit subscription */}
                                    <div
                                      className="dropdown-hover"
                                      onClick={() => editsubscription(subscr)}
                                    >
                                      <FontAwesomeIcon
                                        icon={faPen}
                                      ></FontAwesomeIcon>
                                    </div>

                                    {/* Delete subscription */}
                                    <div
                                      className="dropdown-hover"
                                      onClick={() =>
                                        handleDeleteSubscription(subscr.id)
                                      }
                                    >
                                      <FontAwesomeIcon
                                        icon={faTrash}
                                        style={{ color: "red" }}
                                      ></FontAwesomeIcon>
                                    </div>
                                  </div>
                                )}
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
                  </tbody>
                </table>
                {/* <div className="pagination">
                  <div>
                    <button
                      className="pagination-prev"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      <span>&#60;&#60;</span>
                      Prev
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => {
                   
                      if (
                        i + 1 === currentPage ||
                        i + 1 === currentPage - 1 ||
                        i + 1 === currentPage + 1 
                      ) {
                        return (
                          <button
                            key={i + 1}
                            className={`pagination-link ${
                              i + 1 === currentPage ? "active" : ""
                            }`}
                            onClick={() => handlePageChange(i + 1)}
                          >
                            {i + 1}
                          </button>
                        );
                      } else if (
                        i === 1 &&
                        currentPage > 3 
                      ) {
                        return (
                          <span
                            style={{ marginLeft: "5px" }}
                            key="ellipsis-start"
                            className="pagination-ellipsis"
                          >
                            ...
                          </span>
                        );
                      } else if (
                        i === totalPages - 2 &&
                        currentPage < totalPages - 2 
                      ) {
                        return (
                          <span
                            style={{ marginRight: "4px" }}
                            key="ellipsis-end"
                            className="pagination-ellipsis"
                          >
                            ...
                          </span>
                        );
                      }
                      return null; 
                    })}
                    <button
                      className="pagination-next"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      Next <span>&#62;&#62;</span>
                    </button>
                  </div>
                </div> */}
              </>
            )}
            {totalPages ? (
              <div
                class="d-flex "
                style={{
                  marginLeft: "30px",
                }}
                onClick={handleDeleteSelected}
              >
                With selected:<span class="delete-all">Delete</span>
              </div>
            ) : (
              ""
            )}
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

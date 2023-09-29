import React from "react";
import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";
import Footer from "../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../services/auth";
import userImage from "../img/boy.png";
import axios from "axios";
import { update, deleteImage } from "../features/authSlice.js";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "../components/Spinner";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);
const Seeting = () => {
  const dispatch = useDispatch();

  const [imagePreview, setImagePreview] = useState(null);
  const [hasSelectedImage, setHasSelectedImage] = useState(false);
  const [loading, setLoading] = useState(false);
  // console.log("raahl");
  const { user, token } = useAuth();
  const updateDetails = useForm({
    defaultValues: {
      name: user.name,
      email: user.email,
      userProfileImage: user.user_image,
    },
  });
  const { register, handleSubmit, setValue } = updateDetails;
  const updatePassword = useForm();

  const {
    register: passwordRegister,
    handleSubmit: passwordHandleSubmit,
    formState: passwordFormState,
  } = updatePassword;
  const { errors } = passwordFormState;

  // console.log(user);
  const isProfileDetailsOpen = true; // Set this to true to make the section open by default
  const [buttonClicked, setButtonClicked] = useState(true);

  const handleButtonClick = () => {
    setButtonClicked((prevState) => !prevState);
  };

  //function to handle delte-image

  const handleDeleteImage = () => {
    console.log("delted image profile");
    setLoading(true);
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_global_url}/api/user/destroy-userimage?user_id=${user.user_id}`,

      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .request(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        setImagePreview(null);
        setHasSelectedImage(false);
        dispatch(deleteImage());
        return toast.success(response.data.message);
      })
      .catch((error) => {
        // console.log(error);
        // return toast.success(error.data.message);
        return toast.warning(error.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
    // console.log(user.user_image, "store-image");
    // console.log(watch(updateDetails.watch("userProfileImage")), "watcher");
    // console.log("delete-Button");
  };

  const HandelDeleteImageConfirm = () => {
    MySwal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        // Handle the confirmation action here
        handleDeleteImage();
        MySwal.fire("Confirmed!", "Your action has been completed.", "success");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Handle the cancel action here
        MySwal.fire("Cancelled", "Your action has been cancelled.", "error");
      }
    });
  };

  //function to handle update Password
  const handlePasswordSubmit = (data, e) => {
    setLoading(true);
    // console.log(token);
    let datatoPasss = JSON.stringify({
      old_password: data.currentPassword,
      password: data.newPassword,
      password_confirmation: data.password,
    });
    // return console.log(datatoPasss);
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_global_url}/api/update-password`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: datatoPasss,
    };

    axios
      .request(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data.message));
        updatePassword.reset();
        return toast.success(response.data.message);
      })
      .catch((error) => {
        // console.log(error);
        return toast.warning(error.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  //function to handle update profile
  const handleUpdateProfile = (data, e) => {
    // console.log(data, "form Data");
    setLoading(true);
    let { name, userProfileImage } = data;
    let formData = new FormData();
    formData.append("name", name);
    if (typeof userProfileImage === "object") {
      formData.append("document", userProfileImage);
    } else {
      formData.append("document_old", userProfileImage);
    }
    // console.log(formData, "request Data");
    let config = {
      method: "post",
      url: `${process.env.REACT_APP_global_url}/api/update-profile`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: formData,
    };

    axios
      .request(config)
      .then((response) => {
        dispatch(
          update({
            user: response.data.user,
            token: token,
          })
        );
        return toast.success(response.data.message);
      })
      .catch((error) => {
        // console.log(error);
        toast.error("Something Went Wrong");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  //function to show convert the selected image into string so that it can be shown inside the image tag
  const handleImageSelect = (event) => {
    const selectedImage = event.target.files[0];
    if (selectedImage) {
      // setProfilePicture(selectedImage);
      setValue("userProfileImage", selectedImage);
      setHasSelectedImage(true);

      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  // functin to DiscrardTheValue

  const DiscardProfileDetails = (e) => {
    console.log();
    e.preventDefault();
    // Reset the form fields to their default values
    console.log(user);
    updateDetails.reset({
      name: user.name,
      email: user.email,
      userProfileImage: user.user_image,
    });

    // Clear the selected image preview
    setImagePreview(null);
    setHasSelectedImage(false);

    // setButtonClicked((prevState) => !prevState);
  };

  const PasswordReset = (e) => {
    e.preventDefault();
    updatePassword.reset({
      currentPassword: "",
      newPassword: "",
      password: "",
    });
  };

  return (
    <>
      <Navbar onButtonClick={handleButtonClick} />
      <SideBar
        buttonClicked={buttonClicked}
        onButtonClick={handleButtonClick}
      />
      <main className="app-content">
        <div
          style={{
            position: "absolute",
            top: "47%",
            left: "54%",
          }}
        >
          <LoadingSpinner loading={loading} />
        </div>
        {/* <!-- main body section start from here --> */}
        {/* <!-- ::profile deatils --> */}
        <section className="profile-setings mt-5">
          <div className="row justify-content-center">
            <div className="col-md-10 selection-col">
              <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingTwo">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseone"
                      // aria-expanded="false"
                      aria-controls="collapseTwo"
                      aria-expanded={isProfileDetailsOpen} // Set the aria-expanded attribute to control the initial state
                    >
                      Profile Detail
                    </button>
                  </h2>
                  <div
                    id="collapseone"
                    // className="accordion-collapse collapse"
                    aria-labelledby="headingTwo"
                    data-bs-parent="#accordionExample"
                    className={`accordion-collapse collapse show ${
                      isProfileDetailsOpen ? "show" : ""
                    }`}
                  >
                    <div className="accordion-body">
                      <form
                        className="setting-modify-form text-left mx-4 mb-mx-0"
                        id=""
                        onSubmit={handleSubmit(handleUpdateProfile)}
                        autoComplete="off"
                      >
                        <div className="form-group mb-4 mt-2">
                          <div className="form-row d-flex md-block">
                            <label
                              className="form-head col-md-3 user-s-form-label"
                              htmlFor="exampletext"
                            >
                              Image
                            </label>

                            <div className=" col-md-9 mx-3  profile-image-container h-40 d-flex">
                              {hasSelectedImage ? (
                                <img
                                  src={imagePreview}
                                  alt="Profile"
                                  className="user-profile-cntnr user-image-x"
                                />
                              ) : (
                                <img
                                  src={
                                    user.user_image
                                      ? `${process.env.REACT_APP_global_url}/public/${user.user_image}`
                                      : userImage
                                  }
                                  alt="Profile"
                                  className="user-profile-cntnr user-image-x"
                                />
                              )}

                              <div className="edit-icons">
                                {/* <!--icon for editing --> */}
                                <label
                                  htmlFor="edit-profile-image"
                                  className="edit-icon edit-icon-edit"
                                >
                                  <FontAwesomeIcon icon={faPen} />
                                </label>
                                <span
                                  onClick={HandelDeleteImageConfirm}
                                  className="edit-icon edit-icon-edit  delete-Image"
                                >
                                  <FontAwesomeIcon
                                    icon={faTrash}
                                    // onClick={handleDeleteImage}
                                  />
                                </span>
                                {/* <input
                                  type="file"
                                  id="upload-profile-image"
                                  // style={{ display: "none" }}
                                /> */}
                                <input
                                  accept="image/*"
                                  type="file"
                                  id="edit-profile-image"
                                  style={{ display: "none" }}
                                  {...register("userProfileImage")}
                                  onChange={handleImageSelect}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* <!-- :: second input --> */}
                        <div className="form-group mb-4 mt-2">
                          <div className="form-row d-flex d-mb-block">
                            <label
                              className="col-md-3 form-head mb-2 user-s-form-label"
                              htmlFor="exampleInputtitle"
                            >
                              Full Name
                            </label>
                            <div className="select-group col-md-7 h-40 d-flex d-mb-block ">
                              <input
                                className="form-control user-setting-input mx-3 mb-mx-0"
                                id="exampleInputtitle"
                                type="text"
                                aria-describedby="title"
                                {...register("name")}
                              />

                              {/* <!-- :: last name --> */}
                              {/* <input
                                className="form-control user-setting-input mx-3 mb-mx-0 Remov-lastName"
                                id="exampleInputtitle"
                                type="text"
                                aria-describedby="title"
                              /> */}
                            </div>
                          </div>
                        </div>
                        {/* <!-- ::third input --> */}
                        <div className="form-group mb-4 mt-2">
                          <div className="form-row d-flex d-mb-block">
                            <label
                              className="col-md-3 form-head mb-2  user-s-form-label "
                              htmlFor="email"
                            >
                              Email
                            </label>
                            <div className="select-group col-md-7 h-40 d-flex ">
                              <input
                                className="form-control user-setting-input mx-3 mb-mx-0 w-61 "
                                id="email"
                                type="email"
                                aria-describedby="title"
                                {...register("email")}
                                readOnly
                              />
                            </div>
                          </div>
                        </div>
                        <div className="form-group mb-4 mt-2">
                          <div className="form-row d-flex">
                            <span className="form-head col-md-3 "></span>
                            <div className="select-group col-md-8 h-40 d-flex ">
                              <span
                                // href="manage.html"
                                onClick={DiscardProfileDetails}
                                className="discard-btn mx-3 mb-mx-0 mybutton"
                              >
                                Discard
                              </span>
                              <button className="save-change-btn mx-4 mybutton">
                                Save Changes
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- :: second collapse form  --> */}
        <section className="profile-setings mt-4">
          <div className="row justify-content-center">
            <div className="col-md-10 selection-col">
              <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingTwo">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      Change Password
                    </button>
                  </h2>
                  <div
                    id="collapseTwo"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingTwo"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <form
                        className="setting-modify-form password-form text-left mx-4 mb-mx-0"
                        onSubmit={passwordHandleSubmit(handlePasswordSubmit)}
                      >
                        {/* <!-- :: first  current password input --> */}
                        <div className="form-group mb-4 mt-2">
                          <div className="form-row d-flex d-mb-block">
                            <label
                              className="col-md-3 form-head mb-2  user-s-form-label"
                              htmlFor="currentPassword"
                            >
                              Current Password
                            </label>
                            <div className="select-group col-md-5 h-40 d-flex ">
                              <input
                                className="form-control user-setting-input mx-3 mb-mx-0"
                                id="currentPassword"
                                type="password"
                                aria-describedby="title"
                                {...passwordRegister("currentPassword", {
                                  required: {
                                    value: true,
                                    message: "Current Required",
                                  },
                                })}
                              />
                            </div>
                            <div className="error-div term-error">
                              <span>{errors.currentPassword?.message}</span>
                            </div>
                          </div>
                        </div>
                        {/* <!-- ::second  new password input --> */}
                        <div className="form-group mb-4 mt-2">
                          <div className="form-row d-flex d-mb-block">
                            <label
                              className="col-md-3 form-head user-s-form-label mb-2 "
                              htmlFor="newPassword"
                            >
                              New Password
                            </label>
                            <div className="select-group col-md-5 h-40 d-flex ">
                              <input
                                className="form-control user-setting-input mx-3 mb-mx-0 "
                                id="newPassword"
                                type="password"
                                aria-describedby="title"
                                {...passwordRegister("newPassword", {
                                  minLength: {
                                    value: 6, // Minimum length required
                                    message:
                                      "Password must be at least 6 characters long",
                                  },
                                  required: {
                                    value: true,
                                    message: "New Password Required",
                                  },
                                })}
                              />
                            </div>
                            <div
                              className="error-div term-error"
                              style={{ textAlign: "start" }}
                            >
                              <span>{errors.newPassword?.message}</span>
                            </div>
                          </div>
                        </div>
                        {/* <!-- ::third confirm password input --> */}
                        <div className="form-group mb-4 mt-2">
                          <div className="form-row d-flex d-mb-block">
                            <label
                              className="col-md-3 form-head user-s-form-label mb-2 "
                              htmlFor="password"
                            >
                              Confirm New Password
                            </label>

                            <div className="select-group col-md-5 h-40 d-flex ">
                              <input
                                className="form-control user-setting-input mx-3 mb-mx-0"
                                id="password"
                                type="password"
                                aria-describedby="title"
                                {...passwordRegister("password", {
                                  required: {
                                    value: true,
                                    message: "Confirm Password is Required",
                                  },
                                })}
                              />
                            </div>
                            <div className="error-div term-error">
                              <span>{errors.password?.message}</span>
                            </div>
                          </div>
                        </div>
                        {/* <!-- :; submit btn  --> */}
                        <div className="form-group mb-4 mt-2">
                          <div className="form-row d-flex">
                            <span className="form-head col-md-3 "></span>
                            <div className="select-group col-md-9 h-40 d-flex ">
                              <span
                                className="discard-btn mx-3 mb-mx-0 mybutton"
                                onClick={PasswordReset}
                              >
                                Discard
                              </span>
                              <button className="save-change-btn mx-4 mybutton">
                                Save Changes
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Seeting;

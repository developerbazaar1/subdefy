import React from "react";
import Navbar from "../components/Navbar.js";
import Footer from "../components/Footer.js";
import CarouselBlog from "../components/CarouselBlog.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";

import blogpagehead from "../img/blog-page-head.png";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { OpenRoute } from "../utility/ApiServices.js";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
let totalPages;
const Blogs = () => {
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(3);
  const categories = useSelector((state) => state.category);
  const [catfilter, setCatfilter] = useState("");
  const [latestBlog, setLatesBlog] = useState([]);
  const GetBlogs = () => {
    OpenRoute.blogs({ limit: limit, catfilter: catfilter })
      .then((response) => {
        if (response.data.blogs.length <= 0) {
          toast.warning("No Blog found");
        }
        setData(response.data.blogs);
        totalPages = response.data.total_blogs;
        console.log(response.data.blogs);
      })
      .catch((error) => {
        // console.log(error);
        toast.error(error.message);
      });
  };
  const loadMore = () => {
    setLimit(limit + 3);
  };

  const lastesBlog = () => {
    OpenRoute.blogs({ limit: 3, catfilter: "" })
      .then((response) => {
        setLatesBlog(response.data.blogs);
        // console.log("Latest Blog", response.data.blogs);
      })
      .catch((error) => {
        toast.error(error.message);
        // console.log(error);
        // console.log(error, "error mesage");
      });
  };

  const filterCategory = (e) => {
    let filteredCategory = e.target.value;
    setCatfilter(filteredCategory);
  };
  // useEffect(() => {}, []);
  function formatDate(inputDate) {
    const options = { year: "numeric", month: "short", day: "numeric" };
    const date = new Date(inputDate);
    return date.toLocaleDateString("en-US", options).toUpperCase();
  }

  useEffect(() => {
    GetBlogs();
  }, [limit, catfilter]);

  useEffect(() => {
    lastesBlog();
  }, []);
  return (
    <div className="blogs-page">
      {/**************** Navbar component ******************/}

      <Navbar />

      <div className="blogs">
        <section className="">
          <div className="container">
            <div className="row">
              <div className="col-md-5">
                <CarouselBlog />

                <div className="search">
                  <select
                    className="form-select custom-select"
                    onChange={filterCategory}
                  >
                    <option>Category Select</option>
                    {categories?.map((category, index) => (
                      <option value={category.name} key={index}>
                        {category.name}
                      </option>
                    ))}
                    {/* <option>2</option>
                    <option>3</option>
                    <option>4</option> */}
                  </select>
                  {/* <input className="blog-search" type="text" placeholder="category search" />
                        <a className="blog-search-icon"><FontAwesomeIcon  icon={faArrowDown} /></a> */}
                </div>
              </div>
              <div className="col-md-7">
                <div className="slide-img-head text-end">
                  <img src={blogpagehead} alt="" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="blog">
          <div className="container">
            {/**************** Dynamic blogs start ******************/}

            {data?.map((blog, index) => {
              return (
                <div className="row hover-box" key={blog?.id}>
                  <div className="col-lg-6 bdr">
                    <div className="blog-details">
                      <h6 className="blog-catgry font-family-monts">
                        {blog?.blog_category}
                      </h6>
                      <h4>{blog?.blog_title.slice(0, 70)}</h4>
                      <p className="font-family-lato">
                        {blog?.blog_short_desc.slice(0, 200)} <br />
                        <Link to={`/article/${blog.id}`}> Read more</Link>
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-4 bdr">
                    <div className="blog-image">
                      <img
                        src={`${process.env.REACT_APP_global_url}/public/${blog?.blog_thumbnail}`}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              );
            })}

            {/**************** Dynamic blogs end ******************/}
            {limit < totalPages && data.length >= 3 ? (
              <div className="row bdr">
                <div className="col-lg-12 btn-center text-center">
                  <div to="" className="btn btn-loadmore" onClick={loadMore}>
                    Load More
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </section>

        <section className="blogs-cat-post">
          <div className="container bg-post-cat">
            <div className="row">
              <div className="col-lg-12">
                <div className="cat-sec-head pt-4">
                  <h2>Latest posts</h2>
                  <p className="">
                    Looking for the latest updates and insights on a variety of
                    topics? Check out our blog feed, where you’ll find our
                    newest articles on everything from lifestyle and wellness to
                    technology and finance. Stay informed and entertained with
                    our regularly updated blog content.
                  </p>
                </div>
              </div>
            </div>

            <div
              className="row mt-4 justify-content-center "
              style={{ paddingBottom: "12%" }}
            >
              {latestBlog?.map((latest, index) => {
                return (
                  <div className="col-lg-3 card post-card" key={index}>
                    <div className="img blog-cat-post-img">
                      <img
                        src={`${process.env.REACT_APP_global_url}/public/${latest?.blog_thumbnail}`}
                        alt="loading"
                      />
                    </div>
                    <div className="date-area d-flex">
                      <p>
                        {" "}
                        <FontAwesomeIcon
                          className="pe-1"
                          icon={faCalendarDays}
                        />{" "}
                        {formatDate(latest?.created_at)}
                      </p>
                      <p className="text-capitalize">
                        {" "}
                        {latest?.blog_category}
                      </p>
                    </div>
                    <div className="blog-cat-headline mb-4">
                      <h4>{latest?.blog_title.slice(0, 70)}</h4>
                      <Link className="readmore" to={`/article/${latest.id}`}>
                        {" "}
                        Read more
                      </Link>
                    </div>
                  </div>
                );
              })}

              {/* <div className="col-lg-3 card post-card">
                <div className="img blog-cat-post-img">
                  <img src={blog2} alt="" />
                </div>
                <div className="date-area d-flex">
                  <p>
                    {" "}
                    <FontAwesomeIcon
                      className="pe-1"
                      icon={faCalendarDays}
                    />{" "}
                    10 FEB 2018
                  </p>
                  <p className="text-capitalize">Subdefy</p>
                </div>
                <div className="blog-cat-headline">
                  <h4>
                    Subscription Services: Are You Getting Your Money’s Worth?
                  </h4>
                  <Link to="" className="readmore">
                    Read More
                  </Link>
                </div>
              </div> */}
              {/* <div className="col-lg-3 card post-card">
                <div className="img blog-cat-post-img">
                  <img src={blog3} alt="" />
                </div>
                <div className="date-area d-flex">
                  <p>
                    {" "}
                    <FontAwesomeIcon
                      className="pe-1"
                      icon={faCalendarDays}
                    />{" "}
                    10 FEB 2018
                  </p>
                  <p className="text-capitalize">Subdefy</p>
                </div>
                <div className="blog-cat-headline">
                  <h4>How to Choose the Right Streaming Service for You</h4>
                  <Link to="" className="readmore">
                    Read More
                  </Link>
                </div>
              </div> */}
            </div>
          </div>
        </section>
      </div>

      {/**************** Footer component ****************/}
      <Footer />
    </div>
  );
};

export default Blogs;

import React from "react";
import Navbar from "../components/Navbar.js";
import Footer from "../components/Footer.js";
import CarouselBlog from "../components/CarouselBlog.js";
import BackToTopButton from "../components/BackToTopButton.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";

import blogpagehead from "../img/blog-page-head.png";
import blog2 from "../img/blog-2.jpg";
import blog3 from "../img/blog-3.jpg";
import blog4 from "../img/blog-4.jpg";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { OpenRoute } from "../utility/ApiServices.js";

const Blogs = () => {
  const [data, setData] = useState([]);

  const GetBlogs = () => {
    OpenRoute.blogs()
      .then((response) => {
        // console.log();
        setData(response.data.blogs);
      })
      .then((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    GetBlogs();
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
                  <select className="form-select custom-select">
                    <option>Category Select</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
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
                        {blog.blog_title}
                      </h6>
                      <h4>{blog.blog_short_desc.slice(0, 70)}</h4>
                      <p className="font-family-lato">
                        {blog.blog_long_description.slice(0, 200)} <br />
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

            <div className="row bdr">
              <div className="col-lg-12 btn-center text-center">
                <Link to="" className="btn btn-loadmore">
                  {" "}
                  Load More
                </Link>
              </div>
            </div>
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
              <div className="col-lg-3 card post-card">
                <div className="img blog-cat-post-img">
                  <img src={blog4} alt="" />
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
                <div className="blog-cat-headline mb-4">
                  <h4>
                    From Frivolous to Fulfilling: How to Spend Smarter on
                    Recurring Expenses
                  </h4>
                  <Link to="" className="readmore">
                    Read More
                  </Link>
                </div>
              </div>

              <div className="col-lg-3 card post-card">
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
              </div>
              <div className="col-lg-3 card post-card">
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
              </div>
            </div>
          </div>
        </section>
      </div>

      {/**************** Footer component ****************/}
      <Footer />

      {/**************** Back to top component ****************/}
      <BackToTopButton />
    </div>
  );
};

export default Blogs;

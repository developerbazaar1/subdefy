import React from "react";
import Navbar from "../components/Navbar.js";
import Footer from "../components/Footer.js";
import BackToTopButton from "../components/BackToTopButton.js";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Article = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);

  const GetBlog = () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_global_url}/api/get-blog?blog_id=${id}`,
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        setData(response.data.blog);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    GetBlog();
  }, []);

  return (
    <div className="article">
      {/**************** Navbar component ******************/}

      <Navbar />
      <section className="article-image mtr-5">
        <div className="container-fluid mt-4 p-0">
          <div className="banner">
            <img
              className="w-100 min-h-banner"
              src={`${process.env.REACT_APP_global_url}/public/${data[0]?.blog_thumbnail}`}
              // src={`${process.env.REACT_APP_global_url}/public/${data.blog_thumbnail}`}
              alt="loding"
            />
          </div>
        </div>
      </section>

      <section className="article-content pb-5">
        <div className="container text-center max-w mt-4">
          <div className="article head ">
            <h4>{data[0]?.blog_short_desc}</h4>
          </div>
          <div className="row">
            <div className="col-md-8 m-auto">
              <div className="article-para">
                {/* <p>{data[0]?.blog_long_description}</p> */}
                <div
                  dangerouslySetInnerHTML={{
                    __html: data[0]?.blog_long_description,
                  }}
                />
              </div>
            </div>
            <div className="col-md-12 m-auto">
              <div className="img feature-image mt-5">
                <img
                  className="min-h-innerimg"
                  src={data[0]?.bodyImageUrls}
                  alt=""
                />
              </div>
            </div>

            {/* <div className="col-md-8 m-auto">
              <div className="article-para mt-3">
                <p>{data[0]?.body}</p>
              </div>
            </div> */}
          </div>
        </div>
      </section>
      {/**************** Footer component ****************/}
      <Footer />

      {/**************** Back to top component ****************/}
      <BackToTopButton />
    </div>
  );
};

export default Article;

import React from "react";
import Navbar from "../components/Navbar.js";
import Footer from "../components/Footer.js";
import BackToTopButton from "../components/BackToTopButton.js";
import { useParams } from "react-router-dom";
import { OpenRoute } from "../utility/ApiServices.js";
import { useEffect } from "react";
import { useState } from "react";

const FooterPage = () => {
  const { pagename } = useParams();
  const [pageData, setPageData] = useState();

  const getPageData = () => {
    OpenRoute.FooterPage({ name: pagename })
      .then((response) => {
        // console.log(response);
        setPageData(response.data.page[0]);
        // console.log(PageData, "PageDaa");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getPageData();
  }, [pagename]);
  return (
    <div className="affilate_disclouser">
      {/**************** Navbar component ******************/}

      <Navbar />

      <section className="content">
        <div className="container pt-80">
          <div className="row justify-content-center text-center mt-12 ">
            <div className="col-lg-9">
              <div className="heading-bold">
                <h2>{pageData?.page_name}</h2>
              </div>
            </div>
          </div>
          <div className=" col-lg-9 affilate-content mt-2">
            <div
              dangerouslySetInnerHTML={{
                __html: pageData?.page_description,
              }}
            />
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

export default FooterPage;

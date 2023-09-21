import React from "react";
import Navbar from "../components/Navbar.js";
import Footer from "../components/Footer.js";
import BackToTopButton from "../components/BackToTopButton.js";

const Support = () => {
  return (
    <div className="support">
      {/**************** Navbar component ******************/}

      <Navbar />
      <section className="content">
        <div className="container pt-80">
          <div className="row justify-content-center text-center mt-12 ">
            <div className="col-lg-7 mb-90">
              <div className="heading-bold mb-4">
                <h2>
                  SUPPORT AND <br />
                  FEEDBACK
                </h2>
              </div>
              <p className="support-content">
                Welcome to the Subdefy Support & Feedback page! As a growing
                platform, we’re committed to enhancing our services. If you
                require support, please email us at support@subdefy.com. For any
                suggestions or feedback, kindly reach out to
                feedback@subdefy.com. Your input is invaluable as we work
                together to elevate the Subdefy experience.
              </p>
              <p className="support-content">
                {" "}
                Sincerely,
                <br />
                Subdefy Team
              </p>

              <div className="cnt-link">
                <label className=" support-content-cnt text-bold">
                  Support -{" "}
                </label>
                <a
                  className="support-content-cnt"
                  href={"mailto:support@subdefy.com"}
                  rel="noreferrer"
                  target="_blank"
                >
                  {" "}
                  support@subdefy.com
                </a>
                <br />
                <label className="support-content-cnt text-bold mt-5">
                  Feedback -{" "}
                </label>
                <a
                  className="support-content-cnt"
                  href={"mailto:feedback@subdefy.com"}
                  rel="noreferrer"
                  target="_blank"
                >
                  {" "}
                  feedback@subdefy.com
                </a>
              </div>
            </div>
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

export default Support;

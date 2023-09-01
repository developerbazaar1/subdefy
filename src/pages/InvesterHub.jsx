import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const InvesterHub = () => {
  return (
    <>
      <Navbar />
      <div className="support">
        <section className="investor-main pt-130 pb-180 ">
          <div className="container">
            <div className="row justify-content-center text-center mt-5">
              <div className="col-md-9 col-lg-9 col-sm-9 col-xs-12">
                <div className="cst-main-heading mt-4">
                  <h2>Investor Hub</h2>
                  <p className="paragraph">
                    Subdefy is currently searching for investment interest in
                    the form of a S.A.F.E. or Convertible Note. Approved
                    investors who would like to download our pitch deck can do
                    so below.
                  </p>
                </div>
                {/* <!-- FORM --> */}
                <div className="container mt-5">
                  <div className="investor-d-form">
                    <form className="inv-d-f">
                      <input type="text" className="form-item" />
                      <a
                        href="path/to/your/pdf/file.pdf"
                        className="btn i-btn mt-4"
                        download
                      >
                        Download Pitch Deck
                      </a>
                    </form>
                  </div>
                </div>
                {/* <!-- FORM END --> */}
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default InvesterHub;

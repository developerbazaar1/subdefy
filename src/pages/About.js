import React from "react";
import aboutbnr from '../img/about-bnr.png';  
import Navbar from '../components/Navbar.js';
import Footer from '../components/Footer.js';
import BackToTopButton from '../components/BackToTopButton.js';
const About = () => {
  return (
    <div className="about-bg">
      {/**************** Navbar component ******************/ }

      <Navbar/>
      <section className="about-section aside-img">
        <div className="container">
            <div className="row">
              <div className="col-md-12 about-head-banner">
                  <div className="about-us-bnr-wrap">
                    <img className="about-main-bnr" src={aboutbnr} alt="load" />
                  </div>
              </div>
            </div>
        </div>
      </section>
      <section className="about-content mt-4 ">
        <div className="container">
            <div className="row justify-content-center cst-plr ">
              <div className="col-md-9">
                  <div className="abt-head pt-4">
                    <h2>About Us</h2>
                    <p>Subdefy aims to alleviate the burden of recurring expenses by offering a comprehensive solution
                        that covers everything from identifying the best services to managing and paying for them. The
                        service is based on the founders’ own experiences with the pain points associated with recurring
                        expenses.
                    </p>
                    <p><strong>Subdefy Discover</strong> was created to address the challenge of finding the best value
                        service providers when faced with rising subscription prices. The service allows users to
                        compare different providers and choose the best option from a list of providers they may not
                        have previously considered.
                    </p>
                    <p><strong>Subdefy Manage</strong> was developed to assist with managing multiple recurring
                        expenses, which can be difficult to keep track of, especially as more services offer automatic
                        payments. By consolidating all of these expenses in one location, users can gain a better
                        understanding of what they’re paying and when.
                    </p>
                    <p><strong>Subdefy Pay</strong> is the main service offering, which offers users the flexibility to
                        pay their recurring expenses when it suits them. This is particularly useful for those who don’t
                        get paid monthly but are charged on a monthly basis for their services. With Subdefy Pay, users
                        can split their expenses into weekly payments to better manage their cashflow.
                    </p>
                    <div className="abt-tag abt-head pt-80 mb-15">
                        <h4>Hey there, marvelous beings! Subdefy is just a baby in this big, wild world, so bear
                          with us as we spruce things up every two weeks (yes, that’s fortnightly, folks). We
                          absolutely adore your suggestions and feedback, so go ahead, spill the beans to us at
                          feedback@subdefy.com! 
                        </h4>
                        <h4 className="pd-24"> With giddy anticipation,<br/>The Subdefy Squad 😁</h4>
                    </div>
                  </div>
              </div>
            </div>
        </div>
      </section>
      {/**************** Footer component ****************/ }
      <Footer/>
        


        {/**************** Back to top component ****************/ }
        <BackToTopButton/>
    </div>
  );
};
  
export default About;
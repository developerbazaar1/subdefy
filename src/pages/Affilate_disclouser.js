import React from 'react';
import Navbar from '../components/Navbar.js';
import Footer from '../components/Footer.js';
import BackToTopButton from '../components/BackToTopButton.js';
 
const Affilate_disclouser = () => {
  return (
    <div class="affilate_disclouser">
      {/**************** Navbar component ******************/ }

      <Navbar/>
      <section className="content">
          <div className="container pt-80">
              <div className="row justify-content-center text-center mt-12 ">
                  <div className="col-lg-9">
                      <div className="heading-bold">
                          <h2>AFFILIATE DISCLOSURE</h2>
                      </div>
                  </div>
              </div>
              <div className=" col-lg-9 affilate-content mt-2">
                  <p>Subdefy Discovery serves as a professional discovery platform for consumers to find subscription services that best suit their requirements. While we strive to ensure the comprehensiveness of the services displayed, we cannot guarantee that all available subscriptions are presented. If you would like to recommend a subscription for inclusion, please complete the feedback form on our homepage.</p>
                  <p>Please be advised that Subdefy may receive compensation for providing opinions on products, services, websites, and various other topics. Despite receiving compensation for certain posts or advertisements, we maintain our commitment to providing honest opinions, findings, beliefs, and experiences related to the topics or services in question. The views and opinions expressed on this platform are solely those of Subdefy. Any product claim, statistic, quote, or other representation regarding a product or service should be independently verified with the respective manufacturer, provider, or party involved.</p>
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
  
export default Affilate_disclouser;
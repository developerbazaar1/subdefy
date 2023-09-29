import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/style.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import img1 from "../img/img1.png";
import img2 from "../img/img2.png";
import Subscription from "../components/Subscription.js";
import Service from "../components/Service.js";
import Footer from "../components/Footer.js";
import BackToTopButton from "../components/BackToTopButton.js";
import Newsletter from "../components/Newsletter.js";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar.js";

function Home() {
  return (
    <div className="homepage">
      {/**************** Navbar component ******************/}

      <Navbar />

      {/**************** Home page first section start ******************/}

      <section className="main-section">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <motion.div
                className="slide-content"
                animate={{ x: [-200, 0], opacity: 0, scale: 1 }}
                transition={{
                  duration: 2,
                  delay: 0.4,
                }}
                initial={{ x: [0, 0], opacity: 0, scale: 1 }}
                whileInView={{ x: [-200, 0], opacity: 1, scale: 1 }}
              >
                <h1>manage recurring expenses with ease</h1>
                <p>
                  Did you know that on average, 84% of people underestimate how
                  much they spend on recurring expenses by over $100 per month!?
                </p>
                <p>
                  Subdefy Manage allows you to see what services you’re paying
                  for each month and gives you back control. Stop getting caught
                  out with free trials and stop wasting money on services that
                  aren’t perfect for you.
                </p>
                <p>Sign up and use Subdefy Manage for free, forever now!</p>
                <a href="/login" className="btn btn-custom">
                  Sign Up
                </a>
              </motion.div>
            </div>
            <div className="col-md-6">
              <motion.div
                className="slide-img1 text-end"
                animate={{ x: [200, 0], opacity: 0, scale: 1 }}
                transition={{
                  duration: 2,
                  delay: 0.4,
                }}
                initial={{ x: [0, 0], opacity: 0, scale: 1 }}
                whileInView={{ x: [200, 0], opacity: 1, scale: 1 }}
              >
                <img src={img1} alt="" />
              </motion.div>

              <motion.div
                className="slide-img2 text-start"
                animate={{ opacity: 0, scale: 1 }}
                transition={{
                  duration: 2,
                  delay: 0.4,
                }}
                initial={{ opacity: 0, scale: 1 }}
                whileInView={{ opacity: 1, scale: 1 }}
              >
                <img src={img2} alt="" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/**************** Home page first section End ****************/}

      {/**************** Home page Second section start ****************/}

      <section className="pt-80 position-relative subscript overflow-hidden">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8">
              <div className="main-heading">
                <motion.h2
                  animate={{ opacity: 0, scale: 0.3 }}
                  transition={{
                    duration: 2,
                    delay: 0.4,
                  }}
                  initial={{ opacity: 0, scale: 0.3 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                >
                  What are 'subscriptions'?
                </motion.h2>

                <motion.p
                  animate={{ opacity: 0 }}
                  transition={{
                    duration: 2,
                    delay: 0.6,
                  }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                >
                  We deal with subscriptions and we class these as anything you
                  pay for on a recurring basis. Usually this means monthly or
                  annualy. Some examples below.
                </motion.p>
              </div>
            </div>
          </div>

          {/**************** Subscription component ****************/}
          <Subscription />
        </div>
        <div className="container pt-5">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8">
              <div className="main-heading">
                <motion.h2
                  animate={{ opacity: 0, scale: 0.3 }}
                  transition={{
                    duration: 2,
                    delay: 0.4,
                  }}
                  initial={{ opacity: 0, scale: 0.3 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                >
                  Services We Provide
                </motion.h2>
              </div>
            </div>
          </div>

          {/**************** Service component ****************/}
          <Service />
        </div>
      </section>

      {/**************** Home page Second section End ****************/}

      {/**************** Newsletter component****************/}
      <Newsletter />

      {/**************** Footer component ****************/}
      <Footer />

      {/**************** Back to top component ****************/}
      <BackToTopButton />
    </div>
  );
}

export default Home;

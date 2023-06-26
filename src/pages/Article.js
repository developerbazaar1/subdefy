import React from 'react';
import Navbar from '../components/Navbar.js';
import Footer from '../components/Footer.js';
import BackToTopButton from '../components/BackToTopButton.js';
import { useParams } from "react-router-dom";
import {useState, useEffect} from 'react';

const Article = () => {

  const {id}  = useParams(); 
  const url = `http://api.subdefy.com:3001/api/blog/${id}`;
  const [data, setData] = useState([]);

  const fetchInfo = () => {
    return fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data))
  }

  useEffect(() => {
    fetchInfo()
  }, [])

  return (
    <div className="article">
      {/**************** Navbar component ******************/ }

      <Navbar/>
      <section className="article-image mtr-5">
        <div className="container-fluid mt-4 p-0">
            <div className="banner">
                <img className="w-100 min-h-banner" src={data.heroImageUrl} alt="" />
            </div>
        </div>
      </section>

      <section className="article-content pb-5">
        <div className="container text-center max-w mt-4">
            <div className="article head ">
              <h4>{data.title}</h4>
            </div>
            <div className="row">
              <div className="col-md-8 m-auto">
                  <div className="article-para">
                    <p>{data.body}</p>

                  </div>
              </div>
              <div className="col-md-12 m-auto">
                  <div className="img feature-image mt-5">
                    <img className="min-h-innerimg" src={data.bodyImageUrls} alt="" />
                  </div>
              </div>

              
              <div className="col-md-8 m-auto">
                  <div className="article-para mt-3">

                    <p>{data.body}</p>

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
  
export default Article;
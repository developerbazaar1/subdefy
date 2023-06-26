import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './css/style.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Home from './pages/index';
import About from './pages/About';
import Blogs from './pages/Blogs';
import Article from './pages/Article';
import PrivacyPolicy from './pages/Privacy_policy';
import AffilateDisclouser from './pages/Affilate_disclouser';
import Support from './pages/Support';
function App() {





  return (
    <Router>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/about' element={<About/>} />
          <Route path='/blogs' element={<Blogs/>} />
          <Route path='/article/:id' element={<Article/>} />
          <Route path='/privacy-policy' element={<PrivacyPolicy/>} />
          <Route path='/affilate-disclouser' element={<AffilateDisclouser/>} />
          <Route path='/support' element={<Support/>} />
        </Routes>
    </Router>
  );
}

export default App;




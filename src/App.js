import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./css/reactCss.css";
import "./css/style.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Home from "./pages/index";
import About from "./pages/About";
import Login from "./pages/Login";
import Blogs from "./pages/Blogs";
import Article from "./pages/Article";
import PrivacyPolicy from "./pages/Privacy_policy";
import AffilateDisclouser from "./pages/Affilate_disclouser";
import Support from "./pages/Support";
import Calendar from "./pages/Calendar";
import Seeting from "./pages/Seeting";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { useAuth } from "./services/auth";
import Manage from "./pages/Manage";
import CoominSoon from "./pages/CoominSoon";
import Discover from "./pages/Discover";
import InvesterHub from "./pages/InvesterHub";
import WishList from "./components/WishList";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCategory } from "./features/categoriesSlice";

import Service from "./pages/service";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./components/NotFound";

function App() {
  const { isLoggedIn } = useAuth();
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchCategories = () => {
      const config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_global_url}/api/get-categories`,
      };

      axios
        .request(config)
        .then((response) => {
          dispatch(setCategory(response.data.categories));
        })
        .catch((error) => {
          console.log(error);
        });
    };

    fetchCategories();
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/login"
          element={isLoggedIn ? <Navigate to="/manage" /> : <Login />}
        />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/article/:id" element={<Article />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/affilate-disclouser" element={<AffilateDisclouser />} />
        <Route path="/support" element={<Support />} />
        <Route path="/coomin" element={<CoominSoon />} />
        <Route path="/service" element={<Service />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/investerhub" element={<InvesterHub />} />
        <Route exact path="/service/:name" element={<Service />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/api/auth/reset-password" element={<ResetPassword />} />
        {/* <Route path="/test" element={<ApiTest />} /> */}

        {/* protected route */}
        <Route path="/" element={<ProtectedRoutes isLoggedIn={isLoggedIn} />}>
          <Route path="/manage" element={<Manage />} />
          <Route path="/AccountSettings" element={<Seeting />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/wishlist" element={<WishList />} />
        </Route>

        {/* protected route end */}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;

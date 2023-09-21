import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

export default function ProtectedRoutes({ isLoggedIn, component }) {
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return component;
}

ProtectedRoutes.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

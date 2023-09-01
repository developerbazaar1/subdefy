import React from "react";
import { FadeLoader, RiseLoader } from "react-spinners";

const LoadingSpinner = ({ loading }) => {
  if (!loading) return null;

  return (
    <div className="">
      <FadeLoader color="#007bff" loading={loading} />
    </div>
  );
};

export default LoadingSpinner;

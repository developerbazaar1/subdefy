import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { ProtectedRoutes } from "./utility/ApiServices";

const ApiTest = () => {
  const [sub, setSub] = useState([]);

  useEffect(() => {
    ProtectedRoutes()
      .then((data) => {
        setSub(data.subscriptions);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return (
    <div>
      {sub?.map((subs, index) => (
        <div key={index}>{subs?.subscriptionName}</div>
      ))}
    </div>
  );
};

export default ApiTest;

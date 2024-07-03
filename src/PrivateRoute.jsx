import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  let auth = localStorage.getItem("auth_token");
  return auth ? <Outlet /> : <Navigate to="/" />;
  //   return auth ? <Outlet /> : window.close();
  // return <Outlet />;
};

export default PrivateRoute;

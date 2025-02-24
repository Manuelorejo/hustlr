import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AuthRoute: React.FC = () => {
  const token = localStorage.getItem("access_token");

  if (token) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AuthRoute;

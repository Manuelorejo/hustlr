import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../pages/auth/auth.store";

const AuthRoute: React.FC = () => {
  const accessToken = useAuthStore((state) => state.accessToken)

  if (accessToken) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AuthRoute;

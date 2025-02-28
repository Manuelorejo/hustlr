import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../pages/auth/auth.store";

const AuthRoute: React.FC = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  console.log(isAuthenticated)

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AuthRoute;

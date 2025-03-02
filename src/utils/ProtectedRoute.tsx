import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../pages/auth/auth.store";

const ProtectedRoute: React.FC = () => {
  const accessToken = useAuthStore((state) => state.accessToken)

  if (!accessToken) {
    return <Navigate to={`/auth/login?redirectTo=${encodeURIComponent(location.pathname)}`} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../pages/auth/auth.store";

const ProtectedRoute: React.FC = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  if (!isAuthenticated) {
    return <Navigate to={`/auth/login?redirectTo=${encodeURIComponent(location.pathname)}`} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

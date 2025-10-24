// Dependencies
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
// Context
import { useAuth } from "@context/AuthContext";

const ProtectedRoutes = () => {
  const { loading, isAuthenticated } = useAuth();

  if (loading)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <p>Loading...</p>
      </div>
    );
  if (!loading && !isAuthenticated) return <Navigate to="/" replace />;

  return <Outlet />;
};

export default ProtectedRoutes;

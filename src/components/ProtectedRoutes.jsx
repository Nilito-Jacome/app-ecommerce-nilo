import { Navigate, Outlet } from "react-router-dom";
import React from 'react'

const ProtectedRoutes = () => {
  const tokenValue = localStorage.getItem("token");

  if (tokenValue) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoutes;

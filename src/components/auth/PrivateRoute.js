import React from "react";
import { Navigate, Outlet } from "react-router";
import { useAuth } from "../../context/AuthContext";

const PrivateRoute = () => {
  const { currUser } = useAuth();
  return currUser ? <Outlet /> : <Navigate to="/login" />;
};
export default PrivateRoute;

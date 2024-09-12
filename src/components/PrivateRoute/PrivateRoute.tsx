import React from "react";
import "./PrivateRoute.scss";
import { useAppSelector } from "../../custom-hooks/reduxHooks.ts";
import { selectAuth } from "../../redux/slices/auth.slice.ts";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAppSelector(selectAuth);

  console.log(isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;

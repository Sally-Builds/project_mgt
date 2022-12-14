import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserState";

const PrivateRoutes = ({ children }) => {
  const { user } = useContext(UserContext);
  return user.role === "student" ? (
    children
  ) : (
    <Navigate to={`/dashboard/${user.role}`} />
  );
};

export default PrivateRoutes;

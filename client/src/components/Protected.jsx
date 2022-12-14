import React, { useContext } from "react";
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext, UserCon } from "../context/UserState";

const PrivateRoutes = ({ children }) => {
  // const { isLoggedIn, user, rolet } = useContext(UserContext);
  const { user } = UserCon();

  return user ? children : <Navigate to="/" />;
};

export default PrivateRoutes;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { showLogIn } from "../features/modalSlice";

const ProtectedRoutes = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo) {
      dispatch(showLogIn());
    }
  });

  if (userInfo) {
    return <Outlet />;
  } else {
    return <Navigate to={"/"} replace />;
  }
};

export default ProtectedRoutes;

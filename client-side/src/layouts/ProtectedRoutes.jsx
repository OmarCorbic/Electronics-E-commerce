import React from "react";
import { Navigate, Outlet, useLoaderData } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const ProtectedRoutes = () => {
  const data = useLoaderData();

  if (data?.status === true) {
    return <Outlet />;
  } else return <Navigate to="/" />;
};

export const checkLoginStatus = async () => {
  try {
    const response = await axios.post(`/api/v1/auth/verify-access`);
    return response.data;
  } catch (err) {
    toast.error(err?.response?.data?.message);
    return null;
  }
};
export default ProtectedRoutes;

import React from "react";
import { NavLink } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      We could not find the requested path. Go to{" "}
      <NavLink style={{ color: "red" }} to="/">
        Home page
      </NavLink>
    </>
  );
};

export default NotFound;

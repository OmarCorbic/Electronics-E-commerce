import React from "react";
import { NavLink } from "react-router-dom";

const SecondaryNav = () => {
  return (
    <nav className="secondary-navbar container">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/products/laptops">Laptops</NavLink>
      <NavLink to="/products/smartphones">Smartphones</NavLink>
      <NavLink to="/products/cameras">Cameras</NavLink>
      <NavLink to="/products/accessories">Accessories</NavLink>
    </nav>
  );
};

export default SecondaryNav;

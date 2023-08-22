import React from "react";
import { NavLink } from "react-router-dom";
import Spinner from "../components/Spinner";

const Home = () => {
  return (
    <div className="flex items-center justify-center px-[8%]">
      {/* <section className="flex flex-col items-center justify-between lg:flex-row">
        <NavLink to="/products/laptops">
          <article className="flex h-60 w-72 cursor-pointer items-center justify-center bg-['../../images/laptops.png'] bg-contain bg-center bg-no-repeat shadow-xl transition duration-500">
            <div className="overlay">
              <div>Laptops Collection</div>
              <div>Shop now</div>
            </div>
          </article>
        </NavLink>
        <NavLink to="/products/accessories">
          <article className="flex h-60 w-72 cursor-pointer items-center justify-center shadow-xl transition duration-500">
            <div className="overlay">
              <div>Accessoriess Collection</div>
              <div>Shop now</div>
            </div>
          </article>
        </NavLink>
        <NavLink to="/products/cameras">
          <article className="flex h-60 w-72 cursor-pointer items-center justify-center shadow-xl transition duration-500">
            <div className="overlay">
              <div>Cameras Collection</div>
              <div>Shop now</div>
            </div>
          </article>
        </NavLink>
      </section> */}
    </div>
  );
};

export default Home;

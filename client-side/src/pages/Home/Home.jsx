import React from "react";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <div className="container">
      <section className="collections">
        <NavLink to="/products/laptops">
          <article className="laptops">
            <div className="overlay">
              <div>Laptops Collection</div>
              <div>Shop now</div>
            </div>
          </article>
        </NavLink>
        <NavLink to="/products/accessories">
          <article className="accessories">
            <div className="overlay">
              <div>Accessoriess Collection</div>
              <div>Shop now</div>
            </div>
          </article>
        </NavLink>
        <NavLink to="/products/cameras">
          <article className="cameras">
            <div className="overlay">
              <div>Cameras Collection</div>
              <div>Shop now</div>
            </div>
          </article>
        </NavLink>
      </section>
    </div>
  );
};

export default Home;

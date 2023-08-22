import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const SecondaryNav = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/v1/products/categories"
        );
        setCategories(res.data.categories);
      } catch (err) {
        toast.error(err?.data?.message || err.error || err);
        console.log(err?.data?.message || err.error || err);
      }
    };
    fetchCategories();
  }, []);

  return (
    <nav className="flex items-center justify-center gap-4 border-b-[2px] bg-white px-[8%] py-3 text-[min(3vw,15px)] text-gray-600 md:justify-start  ">
      <NavLink className="flex items-center justify-center" to="/">
        Home
      </NavLink>
      {categories.length > 0 &&
        categories.map((category) => {
          const text = category.at(0).toUpperCase() + category.slice(1);
          return (
            <NavLink
              key={category}
              className="flex items-center justify-center"
              to={`/products/${category}`}
            >
              {text}
            </NavLink>
          );
        })}
    </nav>
  );
};

export default SecondaryNav;

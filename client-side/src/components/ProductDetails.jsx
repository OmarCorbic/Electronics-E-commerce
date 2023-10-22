import React, { useEffect } from "react";
import axios from "axios";
import { useLoaderData } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";
import { setHTTPProgress } from "../features/progressSlice";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const { product } = useLoaderData();
  const dispatch = useDispatch();
  const overviewSpecs = ["display", "processor", "memory", "storage"];

  useEffect(() => {
    dispatch(setHTTPProgress(100));
  });

  const handleAddToCart = (event) => {
    event.preventDefault();
    event.stopPropagation();
    dispatch(
      addToCart({
        id: product._id,
        name: product.name,
        price: product.price,
        quantity: 1,
      })
    );
  };
  const handleAddToWishlist = (event) => {
    event.preventDefault();
    event.stopPropagation();
    // dispatch(addToWishlist({ id: product._id, quantity: 1 }));
  };

  return (
    <div className="flex flex-col gap-5 px-[8%] md:grid md:grid-cols-2 md:grid-rows-2">
      <div className="flex justify-center border-b-[1px] border-gray-300 px-6 md:border-none">
        <img
          className="w-full max-w-[400px]"
          src={`${product.imgUrl}`}
          alt="Product image"
        />
      </div>

      <div className="md:flex md:flex-col md:justify-center">
        <p className="py-4 text-left text-xl text-gray-500">{product.name}</p>
        <div className="spec-overview text-xs md:text-sm">
          {product.specifications.map((spec, index) => {
            if (overviewSpecs.includes(Object.keys(spec)[0])) {
              return (
                <div key={index} className="spec-overview-row">
                  <div className="flex items-center justify-start border-b-[1px] border-b-slate-200">
                    {Object.keys(spec)[0][0].toUpperCase() +
                      Object.keys(spec)[0].slice(1)}
                    <hr />
                  </div>
                  <div className="flex items-center justify-start border-b-[1px] border-b-slate-200">
                    {spec[Object.keys(spec)[0]]}
                    <hr />
                  </div>
                </div>
              );
            }
          })}
        </div>

        <div style={{ display: "flex", gap: "5px", marginTop: "20px" }}>
          <button
            onClick={(e) => handleAddToCart(e)}
            className="add-to-cart-button"
          >
            Add to cart
          </button>
          <button
            onClick={(e) => handleAddToWishlist(e)}
            className="add-to-cart-button"
          >
            Add to wishlist
          </button>
        </div>
      </div>

      <div className="md:col-span-2">
        <hr />
        Reviews
      </div>
    </div>
  );
};

export const getProductDetails = async (params) => {
  const { id } = params;
  try {
    const response = await axios.get(`/api/v1/products/product/${id}`);
    return response.data;
  } catch (err) {
    toast.error(err?.response?.data?.message);
    return null;
  }
};

export default ProductDetails;

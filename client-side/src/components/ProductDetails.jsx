import React from "react";
import axios from "axios";
import { useLoaderData } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";

const ProductDetails = () => {
  const { product } = useLoaderData();
  const dispatch = useDispatch();
  const overviewSpecs = ["display", "processor", "memory", "storage"];

  const handleAddToCart = (event) => {
    event.preventDefault();
    event.stopPropagation();
    dispatch(addToCart({ id: product._id, quantity: 1 }));
  };
  const handleAddToWishlist = (event) => {
    event.preventDefault();
    event.stopPropagation();
    // dispatch(addToWishlist({ id: product._id, quantity: 1 }));
  };

  return (
    <div className="single-product-display contain">
      <div className="single-product-img">
        <img src={`${product.imgUrl}`} alt="Product image" />
      </div>
      <div className="single-product-info">
        <p className="name">{product.name}</p>
        <div className="spec-overview">
          {product.specifications.map((spec, index) => {
            if (overviewSpecs.includes(Object.keys(spec)[0])) {
              return (
                <>
                  <div className="spec-name">
                    {Object.keys(spec)[0][0].toUpperCase() +
                      Object.keys(spec)[0].slice(1)}
                    <hr />
                  </div>
                  <div className="spec-value">
                    {spec[Object.keys(spec)[0]]}
                    <hr />
                  </div>
                </>
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

      <div className="single-product-reviews">
        <hr />
        Reviews
      </div>
    </div>
  );
};

export const getProductDetails = async (params) => {
  const { id } = params;
  try {
    const response = await axios.get(
      `http://localhost:3000/api/v1/products/${id}`
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export default ProductDetails;

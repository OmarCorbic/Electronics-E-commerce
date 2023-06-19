import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../features/cart/cartSlice";
import { AiOutlineHeart } from "react-icons/ai";

const Product = ({ product }) => {
  const dispatch = useDispatch();

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
    <Link to={`/product/${product._id}`}>
      <div className="product-card">
        <div>
          <p className="product-card-header">{product.name}</p>
        </div>
        <div className="product-card-body">
          <img src={`${product.imgUrl}`} alt="Product image" />
        </div>
        <div className="product-card-footer">
          <p className="price">{"$" + product.price}</p>
          <button onClick={handleAddToCart} className="add-to-cart-button">
            Add to Cart
          </button>
          <button
            onClick={handleAddToWishlist}
            className="add-to-wishlist-button"
          >
            <AiOutlineHeart color="red" size="26" />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default Product;

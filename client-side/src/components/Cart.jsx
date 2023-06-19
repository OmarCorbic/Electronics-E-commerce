import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../features/cart/cartSlice";

const Cart = () => {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  return (
    <div>
      {items?.map((item) => {
        return (
          <div key={item.id}>
            <span>{item.id} </span>
            <span>{item.quantity}</span>
            <button onClick={() => dispatch(removeFromCart({ id: item.id }))}>
              X
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Cart;

import React from "react";
import { BsFillTrashFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../features/cart/cartSlice";
import { Link } from "react-router-dom";

const Cart = ({ hideModal }) => {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="text-2xl text-gray-800 p-2 ">Cart items</div>
      {items.length < 1 ? (
        <div className="flex items-center justify-center text-center text-2xl text-gray-400 p-2 ">
          Your cart is empty! <br />
          ...
        </div>
      ) : (
        <div className="mb-auto min-h-fit overflow-auto text-sm">
          <div
            style={{ gridTemplateColumns: "4fr 1fr 1fr 1fr" }}
            className="grid grid-rows-1 bg-gray-200 p-2 mb-2 text-gray-700 rounded-sm"
          >
            <span className="">Name</span>
            <span className="flex items-center justify-center">Quantity</span>
            <span className="flex items-center justify-center">Price</span>
          </div>
          {items.map((item) => {
            return (
              <div
                style={{ gridTemplateColumns: "4fr 1fr 1fr 1fr" }}
                className="grid grid-rows-1 bg-gray-200 p-2 mb-2 text-gray-700 rounded-sm"
                key={item.id}
              >
                <Link to={`/product/${item.id}`}>
                  <span>{item.name} </span>
                </Link>
                <span className="flex items-center justify-center">
                  {item.quantity}
                </span>
                <span className="flex items-center justify-center">
                  {`${item.price} KM`}
                </span>
                <button
                  className="flex items-center justify-center p-2 rounded-sm text-red-600"
                  onClick={() => dispatch(removeFromCart({ id: item.id }))}
                >
                  <BsFillTrashFill size={20} />
                </button>
              </div>
            );
          })}
        </div>
      )}
      <div className="flex items-center justify-around mt-2">
        <button
          id="close"
          className="py-2 px-6 w-1/3 text-white bg-sky-500 rounded-sm"
          onClick={hideModal}
        >
          Cancel
        </button>
        <button className="py-2 px-6 w-1/3 text-white bg-sky-500 rounded-sm">
          Continue
        </button>
      </div>
    </div>
  );
};

export default Cart;

import React from "react";
import { BsFillTrashFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../features/cartSlice";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const Cart = ({ hideModal }) => {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const totalPrice = items.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const handleCheckout = async () => {
    try {
      const res = await axios.post("/api/v1/payment/checkout-session", {
        items: items.map((item) => ({
          id: item.id,
          quantity: item.quantity,
        })),
      });
      window.location = res.data.url;
    } catch (err) {
      toast.error(
        err?.data?.message || err?.error || err.message || JSON.stringify(err)
      );
      console.log(err);
    }
  };

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex items-center justify-between">
        <span className="p-2 text-2xl text-gray-800 ">Cart items</span>
        {items.length > 0 && <span>Total price: {`$${totalPrice}`}</span>}
      </div>
      {items.length < 1 ? (
        <div className="flex items-center justify-center p-2 text-center text-xl text-gray-400 ">
          Your cart is empty! <br />
          ...
        </div>
      ) : (
        <div className="mb-auto min-h-fit overflow-auto">
          <div
            style={{ gridTemplateColumns: "4fr 1fr 1fr 1fr" }}
            className="mb-2 grid grid-rows-1 rounded border-2 border-blue-300 p-2 text-gray-900"
          >
            <span className="">Name</span>
            <span className="flex items-center justify-center">Quantity</span>
            <span className="flex items-center justify-center">Price</span>
          </div>
          {items.map((item) => {
            return (
              <div
                style={{ gridTemplateColumns: "4fr 1fr 1fr 1fr" }}
                className="mb-2 grid grid-rows-1 rounded bg-gray-200 p-2 text-gray-700"
                key={item.id}
              >
                <Link
                  onClick={() => {
                    dispatch(hideModal());
                  }}
                  className="flex items-center"
                  to={`/product/${item.id}`}
                >
                  <span>{item.name} </span>
                </Link>
                <span className="flex items-center justify-center">
                  {item.quantity}
                </span>
                <span className="flex items-center justify-center">
                  {`$${item.price}`}
                </span>
                <button
                  className="flex items-center justify-center p-2 text-red-600"
                  onClick={() => dispatch(removeFromCart({ id: item.id }))}
                >
                  <BsFillTrashFill size={20} />
                </button>
              </div>
            );
          })}
        </div>
      )}
      <div className="mt-2 flex items-center justify-around">
        <button
          id="close"
          className="w-1/3 rounded bg-sky-500 px-6 py-2 text-white"
          onClick={hideModal}
        >
          Cancel
        </button>
        <button
          disabled={items.length < 1}
          onClick={handleCheckout}
          className="w-1/3 rounded bg-sky-500 px-6 py-2 text-white"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;

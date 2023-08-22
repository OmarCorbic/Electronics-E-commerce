import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : {
      items: [],
      quantity: 0,
    };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, name, price, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (!item) {
        state.items = [...state.items, { id, name, quantity, price }];
      } else {
        state.items.map((item) => {
          if (item.id === id) {
            item.quantity += quantity;
          }
        });
      }
      state.quantity += quantity;

      localStorage.setItem(
        "cart",
        JSON.stringify({
          items: state.items,
          quantity: state.quantity,
        })
      );
    },
    removeFromCart: (state, action) => {
      state.quantity -= state.items.find(
        (item) => item.id === action.payload.id
      ).quantity;
      state.items = state.items.filter((item) => item.id !== action.payload.id);

      localStorage.setItem(
        "cart",
        JSON.stringify({
          items: state.items,
          quantity: state.quantity,
        })
      );
    },
    changeItemQuantity: (state, action) => {},
  },
});

export default cartSlice.reducer;
export const { addToCart, removeFromCart, changeItemQuantity } =
  cartSlice.actions;

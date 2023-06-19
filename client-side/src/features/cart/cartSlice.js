import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  quantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (!item) {
        state.items = [...state.items, { id, quantity }];
      } else {
        state.items.map((item) => {
          if (item.id === id) {
            item.quantity += quantity;
          }
        });
      }
      state.quantity += quantity;
    },
    removeFromCart: (state, action) => {
      state.quantity -= state.items.find(
        (item) => item.id === action.payload.id
      ).quantity;
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
    changeItemQuantity: (state, action) => {},
  },
});

export default cartSlice.reducer;
export const { addToCart, removeFromCart, changeItemQuantity } =
  cartSlice.actions;

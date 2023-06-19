import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import progressReducer from "../features/progress/progressSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    progress: progressReducer,
  },
});

export default store;

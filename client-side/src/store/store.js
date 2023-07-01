import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import progressReducer from "../features/progress/progressSlice";
import modalReducer from "../features/modal/modalSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    progress: progressReducer,
    modal: modalReducer,
  },
});

export default store;

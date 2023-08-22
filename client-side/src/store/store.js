import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import cartReducer from "../features/cartSlice";
import progressReducer from "../features/progressSlice";
import modalReducer from "../features/modalSlice";
import authReducer from "../features/authSlice";
import { apiSlice } from "../features/apiSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    progress: progressReducer,
    modal: modalReducer,
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiSlice.middleware);
  },
});

export default store;

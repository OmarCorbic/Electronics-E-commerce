import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showCart: false,
  showWishlist: false,
  showLogIn: false,
  showSignUp: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showCart: (state) => {
      state.showCart = true;
    },
    showWishlist: (state) => {
      state.showWishlist = true;
    },
    showLogIn: (state) => {
      state.showLogIn = true;
    },
    showSignUp: (state) => {
      state.showSignUp = true;
    },
    hideModal: (state) => initialState,
  },
});

export default modalSlice.reducer;
export const { showCart, showWishlist, showLogIn, showSignUp, hideModal } =
  modalSlice.actions;

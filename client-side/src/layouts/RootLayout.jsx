import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import NavPrimary from "../components/navigation/NavPrimary";
import NavSecondary from "../components/navigation/NavSecondary";
import Modal from "../components/Modal";
import Cart from "../components/Cart";
import Register from "../components/auth/Register";
import Login from "../components/auth/Login";
import { hideModal } from "../features/modalSlice";
import { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";
import { logout } from "../features/authSlice";

const RootLayout = () => {
  const { progress: progress, modal: modal } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!Cookies.get("access_token")) {
      dispatch(logout());
    }
  });

  const handleHideModal = (e) => {
    if (e.target.id === "background" || e.target.id === "close") {
      dispatch(hideModal());
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={true}></Toaster>
      <NavPrimary />

      <div className=" z-[9996] h-2 w-full bg-slate-900">
        <span
          style={{
            display: "block",
            height: "100%",
            transition: "0.3s",
            width: `${progress}%`,
            backgroundImage:
              "linear-gradient(90deg, #33ffbb, #31acff, #2ad39f, #0170f0)",
          }}
        ></span>
      </div>

      <NavSecondary />

      <main>
        <Outlet />
      </main>

      {modal.showCart && (
        <Modal hideModal={handleHideModal}>
          <Cart hideModal={handleHideModal} />
        </Modal>
      )}
      {modal.showWishlist && (
        <Modal hideModal={handleHideModal}>
          {/* <Wishlist hideModal={handleHideModal} /> */}
        </Modal>
      )}
      {modal.showLogIn && (
        <Modal hideModal={handleHideModal}>
          <Login hideModal={handleHideModal} />
        </Modal>
      )}
      {modal.showSignUp && (
        <Modal hideModal={handleHideModal}>
          <Register hideModal={handleHideModal} />
        </Modal>
      )}
    </>
  );
};

export default RootLayout;

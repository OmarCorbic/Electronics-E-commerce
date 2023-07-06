import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import NavPrimary from "../components/NavPrimary";
import NavSecondary from "../components/NavSecondary";
import Modal from "../components/Modal";
import Cart from "../components/Cart";
import SignUp from "../components/auth/SignUp";
import LogIn from "../components/auth/LogIn";
import { hideModal } from "../features/modal/modalSlice";
import { Toaster, toast } from "react-hot-toast";

const RootLayout = () => {
  const { progress: progress, modal: modal } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleHideModal = (e) => {
    if (e.target.id === "background" || e.target.id === "close") {
      dispatch(hideModal());
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={true}></Toaster>
      <NavPrimary />

      <div className=" bg-slate-900 z-[9996] w-full h-2">
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

      <main className="main">
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
          <LogIn hideModal={handleHideModal} />
        </Modal>
      )}
      {modal.showSignUp && (
        <Modal hideModal={handleHideModal}>
          <SignUp hideModal={handleHideModal} />
        </Modal>
      )}
    </>
  );
};

export default RootLayout;

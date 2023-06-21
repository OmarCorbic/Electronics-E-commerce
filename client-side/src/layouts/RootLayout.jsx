import React, { useEffect } from "react";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import NavPrimary from "../components/NavPrimary";
import NavSecondary from "../components/NavSecondary";
import Modal from "../components/Modal";
import Cart from "../components/Cart";
import { useSelector } from "react-redux";

const RootLayout = () => {
  const [showModal, setShowModal] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);
  const progress = useSelector((state) => state.progress.progress);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showModal]);

  const handleCartClick = () => {
    setShowModal(true);
    setShowCart(true);
  };
  const handleWishlistClick = () => {
    setShowModal(true);
    setShowWishlist(true);
  };

  const hideModal = (e) => {
    if (e.target.classList.contains("modal-background")) {
      setShowModal(false);
      showWishlist ? setShowWishlist(false) : setShowCart(false);
      return;
    }
  };

  return (
    <>
      <NavPrimary
        handleWishlistClick={handleWishlistClick}
        handleCartClick={handleCartClick}
      />

      <div
        style={{
          position: "absolute",
          backgroundColor: "#2c2c2c",
          zIndex: 9996,
          width: "100%",
          height: "6px",
        }}
      >
        <span
          style={{
            display: "block",
            width: `${progress}%`,
            height: "inherit",
            transition: "0.3s",
            backgroundImage:
              "linear-gradient(90deg, #33ffbb, #31acff, #2ad39f, #0170f0)",
          }}
        ></span>
      </div>

      <NavSecondary />

      <main className="main">
        <Outlet />
      </main>

      {showModal && (
        <Modal
          hideModal={hideModal}
          render={() => {
            if (showCart) {
              return <Cart />;
            } else if (showWishlist) {
              return <h1>Wishlist</h1>;
            }
          }}
        />
      )}
    </>
  );
};

export default RootLayout;

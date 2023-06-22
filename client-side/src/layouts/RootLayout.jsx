import React, { useEffect } from "react";
import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import NavPrimary from "../components/NavPrimary";
import NavSecondary from "../components/NavSecondary";
import Modal from "../components/Modal";
import Cart from "../components/Cart";
import { useSelector } from "react-redux";

const RootLayout = () => {
  const location = useLocation();
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

  useEffect(() => {
    return () => {
      setShowModal(false);
      setShowCart(false);
      setShowWishlist(false);
    };
  }, [location]);

  const handleCartClick = () => {
    setShowModal(true);
    setShowCart(true);
  };
  const handleWishlistClick = () => {
    setShowModal(true);
    setShowWishlist(true);
  };

  const hideModal = (e) => {
    if (e.target.id === "background" || e.target.id === "close") {
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

      {showCart && (
        <Modal hideModal={hideModal}>
          <Cart hideModal={hideModal} />
        </Modal>
      )}
      {showWishlist && (
        <Modal hideModal={hideModal}>
          {/* <Wishlist hideModal={hideModal} /> */}
        </Modal>
      )}

      {/* {showModal && (
        <Modal
          hideModal={hideModal}
          render={(hideModal) => {
            if (showCart) {
              return <Cart hideModal={hideModal} />;
            } else if (showWishlist) {
              return <h1>Wishlist</h1>;
            }
          }}
        />
      )} */}
    </>
  );
};

export default RootLayout;

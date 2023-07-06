import {
  AiOutlineShoppingCart,
  AiOutlineHeart,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineUser,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { logOut } from "../features/user/userSlice";
import {
  showCart,
  showLogIn,
  showSignUp,
  showWishlist,
} from "../features/modal/modalSlice";

const PrimaryNav = () => {
  const {
    cart: { quantity },
    user: { loggedIn },
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleCartClick = () => {
    dispatch(showCart());
  };
  const handleWishlistClick = () => {
    dispatch(showWishlist());
  };
  const handleLogInClick = () => {
    dispatch(showLogIn());
  };
  const handleSignUpClick = () => {
    dispatch(showSignUp());
  };
  const handleLogOut = () => {
    dispatch(logOut());
  };

  return (
    <nav className="primary-navbar contain">
      <div className="left-side">
        <Link className="logo" to="/">
          Logo
        </Link>
      </div>

      <SearchBar />

      <div className="right-side">
        {loggedIn && (
          <>
            <div onClick={handleLogOut} className="wishlist-btn btn">
              <div className="icon">
                <AiOutlineHeart size="26" />
              </div>
              <span>Log out</span>
            </div>
            <div onClick={handleWishlistClick} className="wishlist-btn btn">
              <div className="icon">
                <AiOutlineHeart size="26" />
              </div>
              <span>Wishlist</span>
            </div>
            <Link to="/profile" className="wishlist-btn btn">
              <div className="icon">
                <AiOutlineUser size="26" />
              </div>
              <span>Profile</span>
            </Link>
          </>
        )}

        {!loggedIn && (
          <>
            <div onClick={handleLogInClick} className="wishlist-btn btn">
              <div className="icon">
                <AiOutlineLogin size="26" />
              </div>
              <span>Log in</span>
            </div>
            <div onClick={handleSignUpClick} className="wishlist-btn btn">
              <div className="icon">
                <AiOutlineUserAdd size="26" />
              </div>
              <span>Sign up</span>
            </div>
          </>
        )}

        <div onClick={handleCartClick} className="cart-btn btn">
          <div className="icon">
            {quantity ? (
              <div className="quantity-bubble">{quantity}</div>
            ) : null}
            <AiOutlineShoppingCart size="26" />
          </div>
          <span>Cart</span>
        </div>
      </div>
    </nav>
  );
};

export default PrimaryNav;

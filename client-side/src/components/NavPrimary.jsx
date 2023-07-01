import {
  AiOutlineShoppingCart,
  AiOutlineHeart,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineUser,
} from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

const PrimaryNav = ({
  handleCartClick,
  handleWishlistClick,
  handleLogInClick,
  handleSignUpClick,
}) => {
  const { quantity } = useSelector((state) => state.cart);
  const loggedIn = true;

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

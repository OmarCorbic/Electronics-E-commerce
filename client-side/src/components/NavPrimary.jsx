import { AiOutlineShoppingCart, AiOutlineHeart } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

const PrimaryNav = ({ handleCartClick, handleWishlistClick }) => {
  const { quantity } = useSelector((state) => state.cart);

  return (
    <nav className="primary-navbar contain">
      <div className="left-side">
        <Link className="logo" to="/">
          Logo
        </Link>
      </div>

      <SearchBar />

      <div className="right-side">
        <div onClick={handleWishlistClick} className="wishlist-btn btn">
          <div className="icon">
            <AiOutlineHeart size="26" />
          </div>
          <span>Your Wishlist</span>
        </div>

        <div onClick={handleCartClick} className="cart-btn btn">
          <div className="icon">
            {quantity ? (
              <div className="quantity-bubble">{quantity}</div>
            ) : null}
            <AiOutlineShoppingCart size="26" />
          </div>
          <span>Your Cart</span>
        </div>
      </div>
    </nav>
  );
};

export default PrimaryNav;

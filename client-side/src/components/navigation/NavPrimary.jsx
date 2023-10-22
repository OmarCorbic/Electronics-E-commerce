import logo from "../../images/Elecom-logos_transparent.png";
import { useRef } from "react";
import {
  AiOutlineShoppingCart,
  AiOutlineMenu,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineUser,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import {
  showCart,
  showLogIn,
  showSignUp,
  showWishlist,
} from "../../features/modalSlice";
import { logout } from "../../features/authSlice";
import { useLogoutMutation } from "../../features/userAPISlice";
import { toast } from "react-hot-toast";

const PrimaryNav = () => {
  const {
    cart: { quantity },
    auth: { userInfo },
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [apiLogout] = useLogoutMutation();
  const dropdownRef = useRef(null);

  const handleToggleDropdown = () => {
    dropdownRef.current.classList.toggle("hidden");
  };

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
  const handleLogOut = async () => {
    try {
      dispatch(logout());
      await apiLogout().unwrap();
      toast.success("Successfull logged out!");
    } catch (err) {
      toast.error(err?.data?.message || err?.error);
    }
  };

  return (
    <nav className="  text-md relative z-50 flex items-center justify-between bg-slate-900 px-[8%] py-5 text-white lg:text-lg">
      <div className=" h-10 w-20 md:h-20 md:w-52 lg:mr-10">
        <Link to="/">
          <img className="h-full w-full" src={logo} alt="" />
        </Link>
      </div>

      <SearchBar />

      <div className="flex items-center text-center">
        <div
          onClick={handleCartClick}
          className="cursor-pointer flex-col items-center justify-center px-4"
        >
          <span className="relative flex items-center justify-center">
            {quantity ? (
              <div className="absolute right-4 top-[-9px] flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[8px]">
                {quantity}
              </div>
            ) : null}
            <AiOutlineShoppingCart size={23} />
          </span>
          <span className="hidden md:block">Cart</span>
        </div>

        {userInfo ? (
          <div className="group relative flex flex-col items-center justify-center bg-slate-900">
            <Link className="hidden md:block md:w-32" to="/profile">
              <span className="flex items-center justify-center">
                <AiOutlineUser size={23} />
              </span>
              <span>{userInfo.name ? userInfo.name : Profile}</span>
            </Link>

            <div
              onClick={handleToggleDropdown}
              className="cursor-pointer md:hidden"
            >
              <AiOutlineMenu size={23} />
            </div>

            <div
              ref={dropdownRef}
              className=" absolute top-[100%] hidden w-20 bg-slate-900 text-xs md:w-32 md:text-sm group-hover:md:block"
            >
              <Link
                to="/profile"
                className="flex cursor-pointer items-center justify-center border-b-2 py-4 md:hidden"
              >
                Profile
              </Link>
              <div
                onClick={handleLogOut}
                className="flex cursor-pointer items-center justify-center border-b-2 py-4"
              >
                Log out
              </div>
              <div
                onClick={handleWishlistClick}
                className="flex cursor-pointer items-center justify-center py-4"
              >
                Wishlist
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* login button */}
            <div
              onClick={handleLogInClick}
              className="cursor-pointer flex-col items-center justify-center px-4"
            >
              <span className="flex items-center justify-center">
                <AiOutlineLogin size={23} />{" "}
              </span>
              <span className="hidden md:block">Log in</span>
            </div>

            {/* signup button */}
            <div
              onClick={handleSignUpClick}
              className="cursor-pointer flex-col items-center justify-center px-4"
            >
              <span className="flex items-center justify-center">
                <AiOutlineUserAdd size={23} />{" "}
              </span>
              <span className="hidden md:block">Sign up</span>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default PrimaryNav;

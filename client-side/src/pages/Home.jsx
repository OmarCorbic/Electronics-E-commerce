import React, { useRef } from "react";
import heroImg from "../images/hero-image.jpg";
import { Link } from "react-router-dom";

const Home = () => {
  const imgRef = useRef();
  const blurImg = () => {
    imgRef.current.classList.add("blur-sm");
  };
  const unblurImg = () => {
    imgRef.current.classList.remove("blur-sm");
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <section className="relative flex w-full items-center justify-center lg:justify-start">
        <div
          ref={imgRef}
          style={{ backgroundImage: `url(${heroImg})` }}
          className="h-72 w-full bg-cover bg-center bg-no-repeat brightness-50 sm:h-[90vh]   lg:brightness-75 "
        ></div>
        <div className="absolute p-3 text-center text-base font-bold text-white lg:flex lg:h-full lg:w-1/3 lg:items-center lg:gap-3 lg:bg-opacity-50 lg:bg-gradient-to-r lg:from-[rgba(0,0,0,0.9)]  lg:via-[rgba(0,0,0,0.7)] lg:to-transparent lg:p-5 lg:text-2xl">
          <p>Set your self up with the coolest gear!</p>
          <Link className="md:w-52" to="/products/accessories">
            <button
              onMouseEnter={blurImg}
              onMouseLeave={unblurImg}
              className=" mt-2 border-2 border-white bg-orange-600 p-3 text-sm  md:text-lg"
            >
              Shop now!
            </button>
          </Link>
        </div>
      </section>

      <section></section>
    </div>
  );
};

export default Home;

import { GiRotaryPhone } from "react-icons/gi";
import { GrMail } from "react-icons/gr";
import { FaStoreAlt } from "react-icons/fa";
import { BsChevronCompactDown } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  const [showFooter, setShowFooter] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const toggleFooter = () => {
    setShowFooter((prev) => !prev);
    setActiveIndex(null);
  };

  useEffect(() => {
    setShowFooter(false);
    setActiveIndex(null);
  }, [location]);

  return (
    <footer className="mt-auto  bg-slate-900 text-white md:text-xl">
      <div
        onClick={toggleFooter}
        className="flex cursor-pointer items-center justify-center gap-1 p-4 text-center "
      >
        <div>Contact us</div>{" "}
        <div>
          <BsChevronCompactDown size={20} />
        </div>
      </div>
      <div
        className={`${
          showFooter ? "max-h-52  px-5 pb-5" : "max-h-0"
        }  flex flex-col items-start gap-4 overflow-hidden  duration-500 md:flex-row md:justify-around
          `}
      >
        <div
          onClick={() => setActiveIndex(1)}
          className={`group flex cursor-pointer flex-col gap-2 overflow-hidden md:w-full  md:items-center ${
            activeIndex === 1 && "is-active"
          }`}
        >
          <div className="flex items-center gap-2 hover:text-orange-600">
            <FaStoreAlt />
            <p>In person</p>
          </div>
          <p className="max-h-0 text-xs text-slate-400 duration-500 group-[.is-active]:max-h-8 md:text-lg">
            Lost City Street 30{" "}
          </p>
        </div>

        <div
          onClick={() => setActiveIndex(2)}
          className={`group flex cursor-pointer flex-col gap-2 overflow-hidden md:w-full md:items-center ${
            activeIndex === 2 && "is-active"
          }`}
        >
          <div className="flex items-center gap-2 hover:text-orange-600">
            <GiRotaryPhone />
            <p>Call us</p>
          </div>
          <p className="max-h-0 text-xs text-slate-400 duration-500 group-[.is-active]:max-h-8 md:text-lg">
            +39232901255
          </p>
        </div>
        <div
          onClick={() => setActiveIndex(3)}
          className={`group flex cursor-pointer flex-col gap-2 overflow-hidden md:w-full  md:items-center ${
            activeIndex === 3 && "is-active"
          }`}
        >
          <div className="flex items-center gap-2 hover:text-orange-600">
            <GrMail />
            <p>Send us a message</p>
          </div>
          <p className="max-h-0 text-xs text-slate-400 duration-500 group-[.is-active]:max-h-8 md:text-lg">
            Lost City Street 30{" "}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

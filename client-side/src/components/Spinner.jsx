import React from "react";

const Spinner = ({ size = 30 }) => {
  return (
    <div className="flex h-full items-center justify-center rounded-full">
      <div
        className={`h-[${size}px] w-[${size}px] animate-spin rounded-full border-t-4 border-blue-600 border-opacity-30`}
      ></div>
    </div>
  );
};

export default Spinner;

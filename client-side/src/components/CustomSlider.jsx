import React, { useRef } from "react";

const CustomSlider = () => {
  let rangeMin = 100;
  const range = document.querySelector(".range-selected");
  const rangeInput = document.querySelectorAll(".range-input input");
  const rangePrice = document.querySelectorAll(".range-price input");

  const handleRangeInput = (e) => {
    let minRange = parseInt(rangeInput[0].value);
    let maxRange = parseInt(rangeInput[1].value);
    if (maxRange - minRange < rangeMin) {
      if (e.target.className === "min") {
        rangeInput[0].value = maxRange - rangeMin;
      } else {
        rangeInput[1].value = minRange + rangeMin;
      }
    } else {
      rangePrice[0].value = minRange;
      rangePrice[1].value = maxRange;
      range.style.left = (minRange / rangeInput[0].max) * 100 + "%";
      range.style.right = 100 - (maxRange / rangeInput[1].max) * 100 + "%";
    }
  };

  const handleRangePrice = (e) => {
    let minPrice = rangePrice[0].value;
    let maxPrice = rangePrice[1].value;
    if (maxPrice - minPrice >= rangeMin && maxPrice <= rangeInput[1].max) {
      if (e.target.className === "min") {
        rangeInput[0].value = minPrice;
        range.style.left = (minPrice / rangeInput[0].max) * 100 + "%";
      } else {
        rangeInput[1].value = maxPrice;
        range.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%";
      }
    }
  };

  return (
    <>
      <div className="range">
        <div className="range-slider">
          <span className="range-selected"></span>
        </div>
        <div className="range-input">
          <input
            onInput={(e) => handleRangeInput(e)}
            type="range"
            className="min"
            min="0"
            max="1000"
            value="300"
            step="10"
          />
          <input
            onInput={(e) => handleRangeInput(e)}
            type="range"
            className="max"
            min="0"
            max="1000"
            value="700"
            step="10"
          />
        </div>
        <div className="range-price">
          <label for="min">Min</label>
          <input
            onInput={(e) => handleRangePrice(e)}
            type="number"
            name="min"
            value="300"
          />
          <label for="max">Max</label>
          <input
            onInput={(e) => handleRangePrice(e)}
            type="number"
            name="max"
            value="700"
          />
        </div>
      </div>
    </>
  );
};

export default CustomSlider;

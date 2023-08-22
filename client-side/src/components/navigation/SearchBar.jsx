import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [selectValue, setSelectValue] = useState("laptops");
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const handleSelectClick = (e) => {
    e.target.classList.toggle("bl-border-radius");
  };
  const handleSelectBlur = (e) => {
    e.target.classList.remove("bl-border-radius");
  };

  const handleSelectChange = (e) => {
    setSelectValue(e.target.value);
  };

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/products/${selectValue}/${searchValue}`);
    setSearchValue("");
  };

  return (
    <div className="hidden text-[70%] lg:mr-auto lg:block">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="flex items-center justify-center text-gray-600">
          <select
            className="h-10 rounded-bl-full rounded-tl-full border-r-[1px] px-4 text-gray-600"
            value={selectValue}
            onChange={(e) => handleSelectChange(e)}
            onBlur={(e) => handleSelectBlur(e)}
            onClick={(e) => handleSelectClick(e)}
          >
            <option value="laptops">Laptops</option>
            <option value="smartphones">Smartphones</option>
            <option value="cameras">Cameras</option>
            <option value="accessories">Accessories</option>
          </select>
          <input
            className="h-10 pl-2"
            type="search"
            value={searchValue}
            onInput={(e) => handleSearch(e)}
            placeholder="Search here"
          />
          <button
            type="submit"
            className="flex h-10 cursor-pointer items-center justify-center rounded-br-full rounded-tr-full bg-orange-500 px-6 text-white"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;

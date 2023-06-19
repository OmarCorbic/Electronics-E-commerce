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
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="searchbar">
        <select
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
          type="search"
          value={searchValue}
          onInput={(e) => handleSearch(e)}
          placeholder="Search here"
        />
        <button type="submit" className="search-btn">
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;

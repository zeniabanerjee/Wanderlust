import React, { useRef } from "react";

import searchIcon from "../../../assets/images/navbar/search-icon.svg";

export default function SearchBar(props) {
  const searchRef = useRef();
  const handleSearch = () => {
    searchRef.current.value = "";
  };

  return (
    <div className="nav-serach-area hidden xl:hidden">
      <input
        type="text"
        ref={searchRef}
        className="nav-search-input"
        placeholder="Search"
      />
      <button onClick={handleSearch}>
        <img src={searchIcon} alt="search-icon" />
      </button>
    </div>
  );
}

import React, { Component, useEffect, useRef } from "react";
import PropTypes from "prop-types";

const Autocomplete = ({ state, setState, options, setTags, tags }) => {
  const onClick = (e) => {
    setState({
      filteredOptions: [...options],
      showOptions: false,
    });

    if (tags.includes(e.target.innerText)) {
      setTags([...tags]);
    } else {
      setTags([...tags, e.target.innerText]);
    }
  };


  if (state.filteredOptions.length) {
    return (
      <ul className="options absolute bottom-100 bg-white shadow-md rounded-lg flex items-center justify-center flex-col right-0 w-full ">
        {state.filteredOptions.map((optionName) => {
          return (
            <li
              className=" hover:bg-[#CD4B43] hover:text-white w-full text-center cursor-pointer p-2"
              key={optionName}
              onClick={onClick}
            >
              {optionName}
            </li>
          );
        })}
      </ul>
    );
  } else {
    return (
      <div className="no-options absolute bottom-100 bg-white shadow-md rounded-lg flex items-center justify-center flex-col right-0 w-full">
        <em className="w-full text-center cursor-pointer p-2">No such Amenities Found!</em>
      </div>
    );
  }
};

export default Autocomplete;

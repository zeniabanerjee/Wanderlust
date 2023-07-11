import React, { useState } from "react";
import dropdownIcon from "../../../assets/images/tripsDetailsPage/journeyPlanning/dropdownIcon.svg";
import "./style.scss";

export default function Faqs(props) {
  const [dropdown, setDropdown] = useState(true);

  return (
    <li
      className="flex flex-col text-[14px] md:text-[18px] gap-5 cursor-pointer break-all"
      onClick={() => {
        setDropdown(!dropdown);
      }}
    >
      <div className="flex justify-between faqs-heading">
        <div className="flex gap-2 ">
          <i className="fa fa-circle my-auto text-[6px]"></i>
          <h4>{props.question}</h4>
        </div>
        <button
          onClick={() => {
            setDropdown(!dropdown);
          }}
          className={dropdown ? "" : "rotate-90"}
        >
          <img src={dropdownIcon} alt="dropdownicon" />
        </button>
      </div>
      <p className={dropdown ? "hidden" : "block break-all"}>{props.answer}</p>
    </li>
  );
}

import React, { useEffect, useState, useRef } from "react";
import "./style.scss";
import dateSearchIcon from "../../../assets/images/tripsPage/header/date-search-icon.svg";
import DatePicker from "./datePicker/DatePicker.jsx";

export default function Header({
  setCheckInDate,
  setCheckOutDate,
  tripFilterClicked,
  setTripFilterClicked,
  setFilterDestination,
  setFilterPerson,
}) {
  let destination = useRef();
  let noOfPersons = useRef();

  return (
    <>
      <header>
        <div className="flex flex-col xl:flex-row lg:justify-between gap-5 bg-white p-7 rounded-[3rem] lg:mx-[5rem] xl:mx-[12rem] min-[1920px]:mx-[20rem]">
          {/* Remove the classname hidden from the classlist */}
          <div className="flex flex-col gap-2">
            <h4>Where to</h4>
            <input
              ref={destination}
              type="text"
              placeholder="Search Result destination"
              className="bg-transparent "
            />
          </div>
          <DatePicker setDateData={setCheckInDate} type={"Check In"} />
          <DatePicker setDateData={setCheckOutDate} type={"Check Out"} />
          <div className="flex flex-col gap-2 lg:border-l-[2px] border-black lg:pl-5">
            <h4>Person</h4>
            <input
              ref={noOfPersons}
              type="text"
              placeholder="No of Persons"
              className="bg-transparent"
            />
          </div>
          <button
            className="hover:saturate-[75%] hover:scale-125 hidden xl:block hover:contrast-150 w-20 h-20 transition-all duration-300"
            onClick={() => {
              setTripFilterClicked(tripFilterClicked + 1);
              if (destination.current.value) {
                setFilterDestination([destination.current.value]);
              } else {
                setFilterDestination("");
              }

              setFilterPerson(noOfPersons.current.value);
            }}
          >
            <img src={dateSearchIcon} alt="date-search-icon" />
          </button>
          <button
            onClick={() => {
              setTripFilterClicked(tripFilterClicked + 1);
              if (destination.current.value) {
                setFilterDestination([destination.current.value]);
              } else {
                setFilterDestination("");
              }
              setFilterPerson(noOfPersons.current.value);
            }}
            className="bg-[#E5664C] py-3 xl:hidden rounded-[3rem] hover:bg-[#c34a32] hover:text-white transition-colors duration-200"
          >
            Search
          </button>
        </div>
        <h1 className="mt-[5rem] 2xl:mt-[9rem]">
          Make your Trip as beautiful as you
        </h1>
        <h2 className="bg-[#BC4E37]  heading-main">
          Choose your exotic holidays
        </h2>
      </header>
    </>
  );
}

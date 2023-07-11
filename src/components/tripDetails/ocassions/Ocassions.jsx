import React, { useEffect, useState, useRef } from "react";
import honeymoonIcon from "../../../assets/images/tripsDetailsPage/journeyPlanning/bedIcon.svg";
import "./style.scss";

export default function Ocassions({ type, image, desc }) {
  const [toShow, setToShow] = useState(false);
  const refOne = useRef(null);

  useEffect(() => {
    document.addEventListener("click", hideOnClickOutside, true);
  }, []);

  const detailsClickHandler = () => {
    setToShow(!toShow);
  };

  const hideOnClickOutside = (e) => {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setToShow(false);
    }
  };

  return (
    <div className="relative ">
      <div
        className="flex flex-col items-center ocassions"
        ref={refOne}
        onClick={detailsClickHandler}
      >
        <div className="ocassion-image cursor-pointer">
          <img
            className=" max-w-[3rem] md:max-w-[3.75rem] h-[3rem] md:h-[3.75rem]"
            src={image}
            alt="honeymoon-icon"
          />
        </div>
        <p className="pt-[1rem] font-[600] text-[16px]">{type}</p>
      </div>
      {toShow && (
        <div className="flex flex-col gap-0 absolute ">
          <div className="up-arrow ml-5"></div>
          <div className="  bg-[#a53c27ba] backdrop-blur-2xl h-[7.5rem] w-[11.25rem] overflow-y-scroll text-white z-[2] p-2 occassions rounded-2xl cursor-default">
            <h3 className="  text-[0.75rem]  ">{desc}</h3>
          </div>
        </div>
      )}
    </div>
  );
}

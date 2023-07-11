import React from "react";
import bedroomIcon from "../../../assets/images/tripsDetailsPage/journeyPlanning/bedroomIcon.svg";
import "./style.scss";

export default function Ammenities({ image, title }) {
  return (
    <div className="flex flex-col items-center h-full">
      <img
        src={image}
        alt="ammenities-icon"
        className="p-4 lg:p-[1.875rem]  w-[4rem] lg:w-[7.5rem] h-[4rem] lg:h-[7.5rem] rounded-lg lg:rounded-2xl object-fill self-center white-border"
      />
      <p>{title}</p>
    </div>
  );
}

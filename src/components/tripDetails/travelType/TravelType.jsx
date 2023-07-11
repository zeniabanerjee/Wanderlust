import React from "react";
import independentIcon from "../../../assets/images/tripsDetailsPage/journeyPlanning/independentIcon.svg";
import "./style.scss";

export default function TravelType({ image, title }) {
  return (
    <div>
      <img
        className="saturate-0 brightness-200 max-w-[3rem] md:max-w-[3.75rem] h-[3rem] md:h-[3.75rem]"
        src={image}
        alt="travel-type-icon"
      />
      <p className="mt-[1rem]">{title}</p>
    </div>
  );
}

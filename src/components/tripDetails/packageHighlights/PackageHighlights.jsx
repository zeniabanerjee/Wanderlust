import React from "react";
import divingIcon from "../../../assets/images/tripsDetailsPage/journeyPlanning/diving-icon.svg";
import "./style.scss";

export default function PackageHighlights(props) {
  return (
    <div className="w-[25rem]">
      <div className="flex gap-7 ">
        <img
          className="  max-w-[4rem] md:max-w-[5rem] h-[4rem] md:h-[5rem] rounded-lg self-center"
          src={props.imgSrc}
          alt="diving-icon"
        />
        <div className="flex flex-col">
          <h4 className=" text-[#B4BBC1] text-[1.5rem]">{props.title}</h4>
          <p className="">{props.content}</p>
        </div>
      </div>
    </div>
  );
}

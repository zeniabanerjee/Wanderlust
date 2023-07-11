import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./style.scss";
export default function TripNames(props) {
  const navigate = useNavigate();
  let FrontendUserData = {};

  const viewButtonHandler = (e) => {
    FrontendUserData = {
      bookingId: e.target.getAttribute("data-booking-id"),
      userId: props.userId,
    };
    navigate(
      "/bookingDetails/" +
        FrontendUserData.userId +
        "/" +
        FrontendUserData.bookingId,
      { state: FrontendUserData }
    );
  };

  return (
    <tr className="bg-white grey-text ">
      <td className="rounded-tl-xl rounded-bl-xl  py-[15px] lg:px-[40px] px-[10px]">
        {props.title}
      </td>
      <td className="  py-[15px] lg:px-[40px] px-[10px]">{props.duration}</td>
      <td className="  py-[15px] lg:px-[40px] px-[10px]">{props.passengers}</td>
      <td className="  py-[15px] lg:px-[40px] px-[10px]">{props.price}</td>
      <td className="  py-[15px] lg:px-[40px] px-[10px]">{props?.status}</td>
      <td className="rounded-tr-xl rounded-br-xl   py-[15px] lg:px-[40px] px-[10px]">
        <button
          data-booking-id={props.bookingId}
          onClick={viewButtonHandler}
          className="px-[25px] py-[10px] view-btn text-[white]"
        >
          View
        </button>
      </td>
    </tr>
  );
}

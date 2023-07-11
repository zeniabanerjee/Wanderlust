import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import timestampConvert from "../../../functions/convertDate";
import { format } from "date-fns";
import "./style.scss";

export default function TripNotifications({
  createdAt,
  title,
  description,
  _id,
  readStatus,
  notisUnread,
  setNotisUnread,
  frontendUserId,
  refId,
}) {
  const markAsReadBtnHandler = async ({ target }) => {
    const parentElement = target.parentElement.parentElement;
    const notificationId = target.getAttribute("data-booking-id");
    const markasReadApi =
      process.env.REACT_APP_API_HOST +
      "set-notification-mark-read/" +
      notificationId;

    try {
      const response = await axios.get(markasReadApi);
      if (response.status === 200) {
        const notisUnreadCopy = [...notisUnread];

        notisUnreadCopy.splice(
          notisUnreadCopy.find((data) => data._id === notificationId),
          1
        );
        setNotisUnread(notisUnreadCopy);
        parentElement.classList.remove("bg-blue-100");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <li
      className={
        "notification-li flex flex-col lg:flex-row justify-between grey-text rounded-tl-xl rounded-bl-xl rounded-tr-xl rounded-br-xl h-auto my-5 " +
        (!readStatus ? " bg-blue-100 " : " bg-stone-100 ")
      }
    >
      <div className="flex flex-col gap-2 py-[20px] pb-3 px-2 md:px-[30px]">
        <h4 className="text-orange-500 font-bold underline">{title}</h4>
        <span className="text-stone-950">{description}</span>
        <p className="text-blue-500">Booking ID : {_id}</p>
      </div>

      <div className="rounded-tr-xl rounded-br-xl py-[3px] lg:px-[40px] px-[20px] my-auto">
        <Link
          data-booking-id={_id}
          onClick={markAsReadBtnHandler}
          to={`${window.location.origin}/bookingDetails/${frontendUserId}/${refId}`}
          className=" block text-center text-xs p-2 bg-orange-700 text-white rounded-3xl"
        >
          View Details
        </Link>

        <p className="text-grey-200 text-base text-right">
          At {timestampConvert(createdAt)} on{" "}
          {format(new Date(createdAt.split("T")[0]), "dd-MM-yyyy")}
        </p>
      </div>
    </li>
  );
}

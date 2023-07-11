import React, { useState, useEffect } from "react";
import { notifications } from "../data";
import { Link } from "react-router-dom";
import "./style.scss";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";
import { getUserBookingById } from "../../../redux/slices/bookingSlice";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import timestampConvert from "../../../functions/convertDate";

export default function NotificationPopUp({
  statusNotis,
  setShowNotis,
  notisUnread,
  setNotisUnread,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { bookingData } = useSelector((state) => state.booking);

  const { FrontendUserData } = useSelector((state) => state.user);
  const froneendUserId = FrontendUserData?.data?.userDetails._id;
  const currentPort = window.location.port;

  const handleNavigate = async (e) => {
    const parentElement = e.target.parentElement;
    const notificatonId = e.target.getAttribute("data-notification-id");
    const markasReadApi =
      process.env.REACT_APP_API_HOST +
      "set-notification-mark-read/" +
      notificatonId;

    try {
      const response = await axios.get(markasReadApi);

      if (response.status === 200) {
        const notisUnreadCopy = [...notisUnread];

        notisUnreadCopy.splice(
          notisUnreadCopy.find((data) => data._id === notificatonId),
          1
        );

        setNotisUnread(notisUnreadCopy);
        parentElement.classList.remove("bg-blue-100");
      }
    } catch (err) {
      console.error(err);
    }

    dispatch(getUserBookingById);

    setShowNotis(false);
  };

  const viewAllBtnHandler = () => {
    statusNotis.forEach(async ({ _id }) => {
      const markasReadApi =
        process.env.REACT_APP_API_HOST + "set-notification-mark-read/" + _id;
      try {
        const response = await axios.get(markasReadApi);
      } catch (err) {
        console.error(err);
      }
    });
  };

  return (
    <div className="notification-popup absolute bottom-[-1rem] right-[-2rem] top-[110%] w-[25rem]  h-[30rem] overflow-auto  bg-stone-200 rounded-3xl shadow-hard text-sm">
      <div className=" flex justify-between py-5 bg-white w-full sticky top-0 px-4 shadow-xl ">
        <button
          className="px-5 py-2  bg-slate-300 rounded-2xl "
          onClick={viewAllBtnHandler}
        >
          Mark All As Read
        </button>
        <Link
          className="px-5 py-2  bg-slate-300 rounded-2xl"
          to={"/notifications"}
        >
          View All
        </Link>
      </div>
      {statusNotis
        ?.slice(0)
        .reverse()
        .map((data, index) => {
          return (
            <div
              key={index}
              className={
                "m-4 notification-popup-item p-3 border border-orange-700 rounded-3xl shadow-xl flex flex-col gap-2 " +
                (data.readStatus ? " bg-white " : " bg-blue-100 ")
              }
            >
              <h2 className="font-bold text-orange-600">{data.title}</h2>
              <p className="my-3 leading-loose text-blue-500">
                {data.description}
              </p>
              <p className="text-right text-xs text-gray-400">
                At {timestampConvert(data.createdAt)} on{" "}
                {format(new Date(data.createdAt.split("T")[0]), "dd-MM-yyyy")}
              </p>
              <Link
                data-notification-id={data._id}
                onClick={handleNavigate}
                to={`${window.location.origin}/bookingDetails/${froneendUserId}/${data?.refId}`}
                className=" text-center text-xs p-2 bg-orange-700 text-white rounded-3xl"
              >
                View Details
              </Link>
            </div>
          );
        })}
      {statusNotis?.length <= 0 ? (
        <div className="text-4xl text-stone-300 font-semibold text-center mt-36">
          No Notifications Found
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

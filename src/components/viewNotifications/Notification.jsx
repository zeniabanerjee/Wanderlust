import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import getAllApiData from "./logic";
import TripNotifications from "./tripNotifications/TripNotifications";
import socket from "../../functions/socket";
import { getUserBookingById } from "../../redux/slices/bookingSlice";
import axios from "axios";
import "./style.scss";

export default function Notification() {
  const { FrontendUserData } = useSelector((state) => state.user);
  const userId = FrontendUserData.data.userDetails._id;
  const [userBookingDetails, setUserBookingDetails] = useState();
  const [notisUnread, setNotisUnread] = useState([]);
  const [statusNotis, setStatusNotis] = useState("");

  const frontendUserId = FrontendUserData?.data?.userDetails._id;

  useEffect(() => {
    if (!statusNotis) {
      getAllNotifications();
    }

    socket.on(localStorage.getItem("id"), (res) => {
      setStatusNotis(res);

      setNotisUnread(
        res?.data?.filter((data) => {
          return data.readStatus === false;
        })
      );
    });
  }, [socket]);

  const getAllNotifications = async () => {
    const allNotisApi =
      process.env.REACT_APP_API_HOST +
      "get-user-notification/" +
      localStorage.getItem("id");

    const response = await axios.get(allNotisApi);

    setStatusNotis(response?.data);

    setNotisUnread(
      response?.data?.data.filter((data) => {
        return data.readStatus === false;
      })
    );
  };

  const viewAllBtnHandler = () => {
    statusNotis?.data.forEach(async ({ _id }) => {
      const markasReadApi =
        process.env.REACT_APP_API_HOST + "set-notification-mark-read/" + _id;
      try {
        const response = await axios.get(markasReadApi);
      } catch (err) {
        console.error(err);
      }
    });
  };

  useEffect(() => {
    getAllApiData(userId, setUserBookingDetails);
  }, []);

  return (
    <section className="flex flex-col notification-list-container justify-center items-center ">
      <h2 className="sm:text-[54px] text-center mt-[10px] lg:mt-[30px] text-[40px] font-[300]">
        Notifications({notisUnread.length})
      </h2>

      <div className="notification-container overflow-x-scroll w-full lg:w-[70%] py-20 px-3 md:px-10">
        <ul className="flex flex-col md:h-[35rem] h-[25rem] overflow-y-scroll text-[20px] sm:text-[30px] ">
          {statusNotis?.data
            ?.slice(0)
            .reverse()
            .map((data, index) => {
              return (
                <TripNotifications
                  createdAt={data.createdAt}
                  title={data.title}
                  description={data.description}
                  readStatus={data.readStatus}
                  notisUnread={notisUnread}
                  setNotisUnread={setNotisUnread}
                  _id={data._id}
                  refId={data.refId}
                  key={index}
                  frontendUserId={frontendUserId}
                />
              );
            })}
        </ul>
        <button
          className="px-5 py-2 bg-slate-200 ml-auto block mt-10 rounded-xl"
          onClick={viewAllBtnHandler}
        >
          Mark All As Read
        </button>
      </div>
    </section>
  );
}

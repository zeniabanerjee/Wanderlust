import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { getNotification } from "../../redux/actions/bookingActions";
import { useDispatch, useSelector } from "react-redux";
import Miniloader from "../MiniLoader/Miniloader";
import axios from "axios";
import "./style.scss";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import timestampConvert from "../../functions/timestampConvert";
import format from "date-fns/format";

const NotificationPop = ({
  setNotificationPopup,
  notificationPopup,
  tripUpdatesNotis,
  tripCancellationNotis,
  bookingNotisUnread,
  setBookingNotisUnread,
  cancelNotisUnread,
  setCancelNotisUnread,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.getNotification);
  const runningPort = window.location.port;
  useEffect(() => {
    dispatch(getNotification());
  }, []);

  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const navigateHandler = async ({ target }) => {
    const parentElement = target.parentElement;
    const notificationId = target.getAttribute("data-notification-id");
    const notificationType = parentElement.getAttribute(
      "data-notification-type"
    );

    const markasReadApi =
      process.env.REACT_APP_NODE_API +
      "/set-notification-mark-read/" +
      notificationId;

    try {
      const response = await axios.get(markasReadApi);

      if (response.status === 200) {
        if (notificationType === "tripUpdateNotis") {
          const bookingNotisUnreadCopy = [...bookingNotisUnread];

          const toDelete = bookingNotisUnreadCopy.find(
            (data) => data._id === notificationId
          );

          if (!toDelete.readStatus) {
            bookingNotisUnreadCopy.splice(toDelete, 1);
          }

          setBookingNotisUnread(bookingNotisUnreadCopy);
        } else {
          const cancelNotisUnreadCopy = [...cancelNotisUnread];

          const toDelete = cancelNotisUnreadCopy.find(
            (data) => data._id === notificationId
          );

          if (!toDelete.readStatus) {
            cancelNotisUnreadCopy.splice(toDelete, 1);
          }

          setCancelNotisUnread(cancelNotisUnreadCopy);
        }

        parentElement.classList.remove("bg-blue-100");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-[#F5F9FF] z-50  w-[15rem] sm:w-[25rem] rounded-lg h-[2rem] absolute  top-[3rem] right-[4rem] sm:right-[4.3rem] md:right-[4.6rem]">
      <div
        className="arrow-up absolute right-3 sm:right-[5rem] top-[-10px]
            "
      ></div>

      <div>
        {loading && <Miniloader />}
        <div className="w-full h-full bg-[#F5F9FF] drop-shadow-2xl  rounded-md max-h-[35rem] overflow-auto relative">
          <TabContext value={value}>
            <div className="sticky top-0 bg-white py-1">
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Requests" value="1" />
                <Tab label="Booking Update" value="2" />
              </TabList>
            </div>
            <TabPanel value="1">
              <div className="overflow-y-scroll notification-box max-h-[45%] rounded-2xl">
                {tripCancellationNotis &&
                  tripCancellationNotis?.data
                    ?.slice(0)
                    .reverse()
                    .map((item, index) => {
                      return (
                        <div
                          data-notification-type={"tripCancelNoti"}
                          className={
                            "p-3  rounded-md shadow-lg mb-5 " +
                            (!item?.readStatus ? " bg-blue-100 " : " bg-white ")
                          }
                          key={index}
                        >
                          Booking for{" "}
                          <span className="text-[#E75C54]">{item.title}</span>{" "}
                          on{" "}
                          <span className="text-[#E75C54]">
                            {format(
                              new Date(item.createdAt.split("T")[0]),
                              "dd/MM/yyyy"
                            )}{" "}
                            {timestampConvert(item.createdAt)}
                          </span>{" "}
                          has been requested for cancellation.{" "}
                          <Link
                            to={
                              `http://localhost:${runningPort}/booking-list/booking-details/` +
                              item.refId
                            }
                            className=" text-blue-600 "
                            data-notification-id={item?._id}
                            data-ref-id={item?.refId}
                            onClick={(e) => {
                              setNotificationPopup(false);
                              navigateHandler(e);
                            }}
                          >
                            View Details
                          </Link>
                        </div>
                      );
                    })}
              </div>
            </TabPanel>
            <TabPanel value="2">
              <div className="overflow-y-scroll notification-box max-h-[45%] rounded-2xl">
                {tripUpdatesNotis
                  ?.slice(0)
                  .reverse()
                  .map((data, index) => {
                    return (
                      <div
                        data-notification-type={"tripUpdateNotis"}
                        className={
                          "p-3 flex flex-col gap-2 mb-3 booking-notis-card rounded-md shadow-lg " +
                          (!data?.readStatus ? "bg-blue-100" : "bg-white")
                        }
                        key={index}
                      >
                        <h4 className="text-black">{data.title}</h4>
                        <p>
                          New Trip has been booked on location :{" "}
                          <span className="text-[#CD4B43]">
                            {data.description}
                          </span>
                        </p>
                        <p>
                          Name :{" "}
                          <span className="text-[#CD4B43]">
                            {data.userName}
                          </span>
                        </p>
                        <p>
                          Email :{" "}
                          <span className="text-[#CD4B43]">
                            {data.userEmail}
                          </span>
                        </p>
                        <p>
                          Booked From User ID :{" "}
                          <span className="text-[#CD4B43]">{data.userId}</span>
                        </p>
                        <p className="text-end text-xs text-[#CD4B43]">
                          {format(
                            new Date(data.createdAt.split("T")[0]),
                            "dd/MM/yyyy"
                          )}{" "}
                          {timestampConvert(data.createdAt)}
                        </p>
                        <Link
                          className="bg-[#CD4B43] rounded-md p-2 w-max flex text-white justify-self-end text-center"
                          to={
                            `http://localhost:${runningPort}/booking-list/booking-details/` +
                            data.refId
                          }
                          data-notification-id={data?._id}
                          data-ref-id={data?.refId}
                          onClick={(e) => {
                            navigateHandler(e);
                            setNotificationPopup(false);
                          }}
                        >
                          View Details
                        </Link>
                      </div>
                    );
                  })}
              </div>
            </TabPanel>
          </TabContext>
          <div className="flex text-center w-full bg-white flex-col justify-center items-center  px-2 py-3 sticky bottom-0">
            <button
              className=" w-[80%] bg-[#E75C54] p-1 rounded-md text-white hover:brightness-90 transition-all duration-200 "
              onClick={() => {
                navigate("/cancel-requests");
              }}
            >
              See all
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationPop;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { socket } from "../../functions/socketConnection";
import countNotisUnread from "../../functions/countNotisUnread";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import timestampConvert from "../../functions/timestampConvert";
import format from "date-fns/format";

const CancellationRequest = () => {
  const [response, setResponse] = useState();

  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const API = process.env.REACT_APP_NODE_API;
  const { userDetails } = useSelector((state) => state.userLogin);
  const [notisUnread, setNotisUnread] = useState([]);
  const [statusNotis, setStatusNotis] = useState();
  const runningPort = window.location.port;
  const [tripUpdatesNotis, setTripUpdatesNotis] = useState();
  const [tripCancellationNotis, setTripCancellationNotis] = useState();
  const [bookingNotisUnread, setBookingNotisUnread] = useState([]);
  const [cancelNotisUnread, setCancelNotisUnread] = useState([]);

  useEffect(() => {
    if (userDetails?.data?.userDetails?.userType === "Admin") {
      socket.on("getCancellationRequest", (response) => {
        setTripCancellationNotis(response);
        countNotisUnread(response, cancelNotisUnread, setCancelNotisUnread);
      });
    }

    socket.on("getCurrentBooking", (response) => {
      setTripUpdatesNotis(response);
      countNotisUnread(response, bookingNotisUnread, setBookingNotisUnread);
    });
  }, [socket]);

  useEffect(() => {
    if (!tripUpdatesNotis || !tripCancellationNotis) {
      getBookingNotis();
    }
  }, []);

  const getBookingNotis = async () => {
    const bookingNotisUrl = `${process.env.REACT_APP_NODE_API}/get-booking-notifications/Frontend-user`;
    try {
      const response = await axios.get(bookingNotisUrl);
      setTripUpdatesNotis(response?.data);

      countNotisUnread(
        response?.data,
        bookingNotisUnread,
        setBookingNotisUnread
      );
    } catch (err) {}

    const cancelBookingNotisUrl = `${process.env.REACT_APP_NODE_API}/get-booking-notifications/Backend-user`;
    try {
      const response = await axios.get(cancelBookingNotisUrl);

      setTripCancellationNotis(response?.data);

      countNotisUnread(response?.data, cancelNotisUnread, setCancelNotisUnread);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRequest = async () => {
    const data = await axios.get(`${API}/get-cancel-booking-request`);
    setResponse(data);
  };

  useEffect(() => {
    handleRequest();
  }, []);

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
    <div className="w-full bg-white px-2  h-[85vh] overflow-auto ">
      <TabContext value={value}>
        <div className="sticky top-0 bg-white">
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Bookings" value="1" />
            <Tab label="Booking Update" value="2" />
          </TabList>
        </div>
        <TabPanel value="1">
          <div className="flex flex-col gap-3 max-h-[45%] overflow-auto bg-slate-200 p-2 border-b-4 border-white">
            {tripCancellationNotis &&
              tripCancellationNotis?.data
                ?.slice(0)
                .reverse()
                .map((item, index) => {
                  return (
                    <div
                      data-notification-type={"tripCancelNoti"}
                      className={
                        "p-3  rounded-md shadow-lg  " +
                        (!item?.readStatus ? " bg-blue-100 " : " bg-white ")
                      }
                      key={index}
                    >
                      Booking for{" "}
                      <span className="text-[#E75C54]">{item.title}</span> on{" "}
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
                        className=" text-blue-500 "
                        data-notification-id={item?._id}
                        data-ref-id={item?.refId}
                        onClick={navigateHandler}
                      >
                        View Details
                      </Link>
                    </div>
                  );
                })}
          </div>
        </TabPanel>
        <TabPanel value="2">
          {" "}
          <div className="max-h-[45%] overflow-auto bg-slate-200 p-2">
            {tripUpdatesNotis?.data
              ?.slice(0)
              .reverse()
              .map((data, index) => {
                return (
                  <div
                    className={
                      "p-3 flex flex-col gap-2 my-3 booking-notis-card rounded-md shadow-lg " +
                      (!data.readStatus ? " bg-blue-100 " : " bg-white ")
                    }
                    key={index}
                  >
                    <h4 className="text-[#CD4B43]">{data.title}</h4>
                    <p>
                      New Trip has been booked on location :{" "}
                      <span className="text-[#CD4B43]">{data.description}</span>
                    </p>
                    <p>
                      Name :{" "}
                      <span className="text-[#CD4B43]">{data.userName}</span>
                    </p>
                    <p>
                      Email :{" "}
                      <span className="text-[#CD4B43]">{data.userEmail}</span>
                    </p>
                    <p>
                      Booked From User ID :
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
                      onClick={navigateHandler}
                      data-notification-id={data._id}
                      data-ref-id={data.refId}
                    >
                      View Details
                    </Link>
                  </div>
                );
              })}
          </div>
        </TabPanel>
      </TabContext>

      {/* <div className="h-[50vh]"> */}
    </div>
  );
};

export default CancellationRequest;

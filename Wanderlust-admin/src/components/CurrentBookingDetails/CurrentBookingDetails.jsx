import { React, useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import CancelDialog from "../CancelDialog/cancelDialog";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getSingleBooking,
  updateBooking,
  updateBookingStatus,
} from "../../redux/actions/bookingActions";
import Swal from "sweetalert2";
import LoadingScreen from "../Loading/LoadingScreen";
import store from "../../redux/store";
import StatusMenu from "../StatusMenu/StatusMenu";
import AlertComponent from "../Alerts/AlertComponent";
import { socket } from "../../functions/socketConnection";
import defaultBookingImg from "../../assets/images/booking/defaultImage.jpg";
import axios from "axios";

const CurrentBookingDetails = () => {
  const { data, loading } = useSelector((state) => state.getSingleBooking);
  const { data: updatedBooking } = useSelector((state) => state.updateBooking);
  const { data: deleted } = useSelector((state) => state.deleteBooking);
  const { data: updatedStatus, error } = useSelector(
    (state) => state.updateBookingStatus
  );
  const dispatch = useDispatch();
  const [cancelPopUp, setCancelPopUp] = useState(false);
  const [submitDelete, setSubmitDelete] = useState(false);
  const [status, setStatus] = useState("");
  const [update, setUpdate] = useState(false);

  let { id } = useParams();

  const options = [
    { label: "Confirm", value: "Confirm" },
    { label: "Pending", value: "Pending" },
    { label: "Completed", value: "Completed" },
  ];

  useEffect(() => {
    dispatch(getSingleBooking(id));
  }, [id]);

  useEffect(() => {
    if (data && data.data) {
      setStatus({
        label: data && data.data.bookingStatus,
        value: data && data.data.bookingStatus,
      });
    }
  }, [data]);

  const [deny, setDeny] = useState(updatedBooking);
  const [requestedForCancel, setRequestedForCancel] = useState();
  const navigate = useNavigate();
  const storeData = store.getState();
  const userType = storeData.userLogin.userDetails.data.userDetails.userType;

  const denyReq = async () => {
    dispatch(updateBooking(id, "false", "", "false"));
    setRequestedForCancel(false);
    setSubmitDelete(false);
    if (userType === "Backend-user") {
      const updateDeleteRequest = `${process.env.REACT_APP_NODE_API}/read-notification/${id}`;

      try {
        const response = await axios.get(updateDeleteRequest);
      } catch (err) {
        console.log(err);
      }
    }
    setDeny(!deny);
    Swal.fire({
      position: "top",
      icon: "success",
      title: "Done!",
      text: `Cancel request ${userType === "Admin" ? "denied!" : "deleted!"}`,
      showConfirmButton: false,
      toast: true,
      timer: 1500,
      timerProgressBar: true,
    });
  };

  useEffect(() => {
    dispatch(getSingleBooking(id));
  }, [deny, cancelPopUp]);

  useEffect(() => {
    if (submitDelete) {
      dispatch(getSingleBooking(id));

      Swal.fire({
        position: "top",
        icon: "success",
        title: "Done!",
        text: `Booking  ${
          userType === "Admin" ? "Cancelled!" : "requested for cancellation!"
        }`,
        showConfirmButton: false,
        toast: true,
        timer: 1500,
        timerProgressBar: true,
      });
    }
  }, [submitDelete]);

  const updateStatus = () => {
    if (id && status.value) {
      dispatch(updateBookingStatus(id, status.value));

      const notificationObj = {
        userType: "User",
        title: "Trip Update",
        description: `Your Trip with ${id} has been updated!`,
        refId: id,
        userId: data?.data.userId,
        createdAt: new Date(),
        readStatus: false,
      };

      socket.emit("sendStatusUpdate", notificationObj);
    }
  };

  useEffect(() => {
    if (updatedStatus) {
      dispatch({ type: "UPDATE_BOOKING_STATUS_SUCCESS", payload: null });
      AlertComponent("success", updatedStatus);
      setTimeout(() => {
        navigate("/booking-list");
      }, 2000);
    } else if (updatedStatus?.success === false) {
      AlertComponent("failed", updatedStatus);
      dispatch({ type: "UPDATE_BOOKING_STATUS_SUCCESS", payload: null });
    }
  }, [updatedStatus]);

  useEffect(() => {
    if (error) {
      AlertComponent("error", error);
      dispatch({ type: "UPDATE_BOOKING_STATUS_FAILED", payload: null });
    }
  }, [error]);

  useEffect(() => {
    if (data !== null) {
      if (data?.data?.cancellationStatus === "true") {
        setRequestedForCancel(true);
      } else {
        setRequestedForCancel(false);
      }
    }
  }, [data]);

  if (loading) {
    return <LoadingScreen />;
  } else if (data && data?.data)
    return (
      <>
        <div className="sm:px-10 sm:pt-10">
          <div className="flex-col bg-white flex md:flex-row w-full item-center py-5">
            <div className="flex  md:w-[50%] w-full p-2">
              <div className="w-[100%] md:mx-4 md:mt-4 mx-2 my-2 flex  justify-center md:justify-start">
                <img
                  className="object-cover w-[350px] h-[350px] sm:w-full md:w-full md:h-[400px] rounded-md"
                  src={data?.data.tripDetails?.image}
                  alt="booking-img"
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = defaultBookingImg;
                  }}
                />
              </div>
            </div>
            <div className="mx-2 md:w-[50%] self-center sm:w-full sm:self-start p-2 ">
              <div className="flex justify-between items-center gap-3">
                <p className="text-3xl  my-5 w-[50%]">{data.data.title}</p>
                <div className="flex w-[50%]">
                  <Link
                    className={`flex border-2 shadow-md px-3 py-2 rounded-md border-[#7e827f] me-5 font-bold
                ${
                  userType === "Backend-user"
                    ? requestedForCancel !== true
                      ? "flex"
                      : "hidden"
                    : data && data.data.bookingStatus !== "Cancelled"
                    ? "flex"
                    : "hidden"
                }
                `}
                    onClick={() => {
                      setCancelPopUp(!cancelPopUp);
                    }}
                  >
                    {userType === "Admin" ? "Cancel" : "Request Cancellation"}
                  </Link>
                  <Link
                    className={` justify-self-end border px-3 py-2 rounded-md border-black me-5 bg-[#E55D54] text-white font-bold
                ${requestedForCancel !== true ? "hidden" : "flex"}`}
                    onClick={() => {
                      denyReq();
                    }}
                  >
                    {userType === "Admin" ? "Deny Request" : "Delete Request"}
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-2 font-medium gap-6 ">
                <span className="text-[#7e827f] font-light">
                  Passenger name:
                </span>
                <p className="break-words"> {data.data.name}</p>
                <span className="text-[#7e827f] font-light">
                  Other passengers:
                </span>
                <p className="break-words">
                  {" "}
                  {data.data.otherPassenger.length}
                </p>
                <div className=" col-span-2 ">
                  <ol className="list-decimal">
                    {data.data.otherPassenger.map((item, index) => {
                      return (
                        <li
                          className="grid grid-cols-2 my-3 gap-2 w-full break-words text-black"
                          key={index}
                        >
                          <p className="">
                            {index + 1}.{item.firstName} {item.lastName}
                          </p>
                          <div className="grid md:grid-cols-4 grid-cols-2 ">
                            <p className=" font-light text-[#7e827f]">Age:</p>
                            <p className="break-words"> {item.age} </p>
                            <p className="font-light text-[#7e827f]">Sex:</p>
                            <p className="break-words"> {item.gender}</p>
                          </div>
                        </li>
                      );
                    })}
                  </ol>
                  <ul>
                    {data.data.otherPassenger.map((item, index) => {
                      return (
                        <li className="flex flex-wrap gap-4" key={index}></li>
                      );
                    })}
                  </ul>
                </div>

                <span className="text-[#7e827f] font-light">
                  Email address:
                </span>
                <p className="break-words overflow-x-scroll">
                  {data.data.email}
                </p>
                <span className="text-[#7e827f] font-light">Phone:</span>
                <p className="break-words">{data.data.phone}</p>
                <span className="text-[#7e827f] font-light">Address:</span>
                <p className="break-words"> {data.data.address}</p>
                <span className="text-[#7e827f] font-light">Status:</span>
                <StatusMenu
                  value={status}
                  onChange={(e) => {
                    setStatus(e);
                    setUpdate(true);
                  }}
                  options={options}
                  textPlaceholder="Status"
                />
                <button
                  className={`col-span-2 bg-[#E55D54] p-2 rounded-md text-white mb-10 ${
                    update ? "opacity-100" : "opacity-0"
                  }`}
                  disabled={!update}
                  onClick={() => {
                    updateStatus();
                  }}
                >
                  Update Status
                </button>
                <div
                  className={`max-h-[8rem] w-full col-span-2  mb-10 shadow-md  gap-2 border-2 border-[#E55D54] rounded-md py-5 px-3 mt-5
               ${requestedForCancel === false ? "hidden" : "flex"}`}
                >
                  <p className="break-words overflow-hidden hover:overflow-scroll">
                    <span className="font-bold">Cancellation Reason: </span>
                    <span>{data.data.deleteReason}</span>
                  </p>
                </div>
                {/* </div> */}
              </div>
            </div>
          </div>
        </div>
        {cancelPopUp ? (
          <CancelDialog
            setCancelPopUp={setCancelPopUp}
            setSubmitDelete={setSubmitDelete}
            id={id}
          />
        ) : (
          ""
        )}
      </>
    );
};

export default CurrentBookingDetails;

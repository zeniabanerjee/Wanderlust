import React, { useEffect, useRef, useState } from "react";
import swal from "sweetalert2";
import SweetAlert from "../../alert/sweetAlert";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import PassengerDetails from "../passengerDetails/PassengerDetails";
import arrow from "../../../assets/images/bookingForm/loginForm/arrow.svg";
import Success from "../successBox/SuccessBox";
import axios from "axios";
import { validName } from "../../../constants/regex";
import LoadingScreen from "../../loading/loadingScreen";
import {
  createBooking,
  resetBooking,
} from "../../../redux/slices/bookingSlice";
import socketIOClient from "socket.io-client";

const Details = (props) => {
  const socket = socketIOClient(process.env.REACT_APP_API_HOST);
  const address = useRef();
  const userName = useRef();
  const dispatch = useDispatch();
  const { bookingData, loading, error } = useSelector((state) => state.booking);
  const phoneNumberRef = useRef();
  const otherPassengerDetails = [];
  const bookingFormDetails = {
    tripId: props.bookingFormData.currentTripId.id,
    userId: props.bookingFormData.currentUserId,
    title: props.bookingFormData.locationName,
    phone: props.bookingFormData.phNumber,
    email: props.bookingFormData.email,
    bookingStatus: "Pending",
    deleteReason: "",
    deleteStatus: false,
    cancellationStatus: false,
  };

  const submitBtnHandler = async () => {
    const otherPassengerSelector = document.querySelectorAll(
      ".other-passenger-details"
    );

    for (let i = 0; i < otherPassengerSelector.length; i++) {
      const firstName = document.querySelector(
        `.other-passenger-details .first-name${i + 1}`
      );
      const lastName = document.querySelector(
        `.other-passenger-details .last-name${i + 1}`
      );
      const gender = document.querySelector(
        `.other-passenger-details .gender${i + 1}`
      );
      const age = document.querySelector(
        `.other-passenger-details .age${i + 1}`
      );

      const tempObj = {
        firstName: firstName.value,
        lastName: lastName.value,
        gender: gender.value,
        age: age.value,
      };

      otherPassengerDetails.push(tempObj);
    }

    bookingFormDetails["otherPassenger"] = otherPassengerDetails;
    bookingFormDetails["address"] = address.current.value;
    bookingFormDetails["name"] = userName.current.value;

    if (userName.current.value && address.current.value) {
      dispatch(createBooking(bookingFormDetails));
    } else {
      SweetAlert("warning", "", "All fields are required!");
    }
  };

  useEffect(() => {
    if (bookingData) {
      setsucessModal(!sucessModal);
      dispatch(resetBooking());

      const notificationObj = {
        userType: "Frontend-user",
        title: "Trip Update",
        description: bookingFormDetails.title,
        refId: bookingData.data._id,
        userId: bookingFormDetails.userId,
        createdAt: new Date(),
        readStatus: false,
        userName: userName.current.value,
        userEmail: bookingFormDetails.email,
      };

      socket.emit("sendCurrentBooking", notificationObj);
    }
  }, bookingData);

  const [sucessModal, setsucessModal] = useState(false);
  const [passenger, setpassenger] = useState(false);
  let [passengerCount, setPassengerCount] = useState(
    props.bookingFormData.guestsSelected
  );
  let passengerHeadCount = [];
  const [passengerCountArray, setPassengerCountArray] = useState([]);
  const [bookingNotes, setBookingNotes] = useState();
  const [errorField, setErrorField] = useState(false);

  const fetchBookingNotes = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_HOST}get-booking-note`
      );
      setBookingNotes(response?.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBookingNotes();
  }, []);

  useEffect(() => {
    handlePassengerHeadCount();
  }, [passengerCount]);

  function handlePassengerHeadCount() {
    passengerHeadCount = [];
    for (let i = 1; i <= passengerCount; i++) {
      passengerHeadCount.push(i);
    }
    setPassengerCountArray(passengerHeadCount);
    passengerCount = props.bookingFormData.guestsSelected;
  }

  const checkValidUserName = () => {
    try {
      if (!isNaN(userName.current.value.charAt(0))) {
        setErrorField(true);
        throw new Error("Name can't be a number!");
      } else {
        document.getElementById("validUserName").textContent = "";
        setErrorField(false);
      }
    } catch (err) {
      document.getElementById("validUserName").textContent = err.message;
    }
  };

  return (
    <>
      {loading && <LoadingScreen />}
      <section className="flex flex-col details-form justify-center items-center ">
        <h2 className="md:text-[50px] text-center lg:mt-[30px] text-[35px]">
          Details about you
        </h2>
        <div className="flex flex-col lg:w-[975px] text-[1rem] w-[90%] md:px-[30px] md:py-[30px] mt-[15px] details-container px-[25px] py-[15px] lg:py-[40px] lg:px-[40px] gap-[1rem] md:gap-[2rem] justify-center">
          <div className="relative">
            <input
              className="input-fields w-full lg:px-[30px] px-[15px] py-[20px] "
              type="text"
              placeholder="Full Name"
              ref={userName}
              onChange={checkValidUserName}
            />
            <h4
              id="validUserName"
              className={
                "font-bold bg-transparent text-xl absolute  " +
                (errorField ? "text-red-700" : "text-green-700")
              }
            ></h4>
          </div>

          <div>
            <input
              className="input-fields lg:px-[30px] px-[15px] py-[20px]  w-[100%]"
              type="text"
              placeholder="Phone Number"
              defaultValue={bookingFormDetails.phone}
              ref={phoneNumberRef}
              disabled={true}
            />
            <h4
              id="validPhone"
              className={
                "font-bold bg-transparent text-xl absolute  " +
                (errorField ? "text-red-700" : "text-green-700")
              }
            ></h4>
          </div>

          <input
            className=" input-fields lg:px-[30px] px-[15px] py-[20px] w-[100%]"
            type="text"
            placeholder="E-mail"
            defaultValue={bookingFormDetails.email}
            disabled={true}
          />
          <input
            className=" input-fields w-[100%] lg:px-[30px] px-[15px] py-[20px]  "
            type="text"
            placeholder="Address"
            ref={address}
          />

          <div className="flex input-fields items-center justify-between lg:px-[30px] px-[15px] ">
            <input
              className=" w-[100%] passenger-field py-[20px] bg-transparent other-passenger"
              type="number"
              placeholder="Other Passenger (number)"
              defaultValue={props.bookingFormData.guestsSelected}
              onChange={(e) => {
                if (e.target.value > props.bookingFormData.maximumGuests) {
                  setPassengerCount(props.bookingFormData.maximumGuests);
                  swal.fire({
                    icon: "warning",
                    title: "Oops...",
                    text: "cant exceed maximum guests for this package",
                    timer: "2500",
                    buttons: true,
                  });
                  e.target.value = props.bookingFormData.maximumGuests;
                } else setPassengerCount(e.target.value);
              }}
            />
            <button
              onClick={() => {
                setpassenger(!passenger);
                if (passenger) {
                  passengerCount = props.bookingFormData.guestsSelected;
                  handlePassengerHeadCount();
                } else {
                  passengerCount = 0;
                  handlePassengerHeadCount();
                }
              }}
            >
              <img
                src={arrow}
                className={" rotate-0 " + (passenger ? " rotate-180" : "")}
                alt="arrow-img"
              />
            </button>
          </div>

          {passengerCountArray.length > 0
            ? passengerCountArray.map((data, index) => {
                return (
                  <PassengerDetails
                    key={index}
                    count={data}
                    iterator={index + 1}
                  />
                );
              })
            : ""}

          <ul className="list-disc flex flex-col gap-2 break-all">
            {bookingNotes?.map((data, index) => {
              return (
                <li className="grey-text text-[0.7rem]" key={index}>
                  {data.note}
                </li>
              );
            })}
          </ul>

          <button
            onClick={submitBtnHandler}
            className=" px-[15px] py-[20px] text-center continue-button"
          >
            SUBMIT
          </button>
        </div>
      </section>
      {sucessModal && <Success setsucessModal={setsucessModal} />}
    </>
  );
};

export default Details;

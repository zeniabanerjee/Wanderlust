import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./style.scss";
import arrow from "../../../assets/images/tripsDetailsPage/priceDetails/arrow.svg";

export default function PricingDetails(props) {
  let guestsArr = [];
  const navigate = useNavigate();
  const [guestsSelected, setGuestsSelected] = useState("No Guests Selected!");
  const [validGuestsSeleced, setValidGuestsSelected] = useState(true);
  const [showGuestDropwdown, setShowGuestDropwdown] = useState(false);

  const refOne = useRef(null);

  useEffect(() => {
    document.addEventListener("click", hideOnClickOutside, true);
  }, []);

  const handleGuestsChange = (e) => {
    setGuestsSelected(e.target.textContent);
    setShowGuestDropwdown(false);
  };

  const guestSelectHandle = () => {
    setShowGuestDropwdown(!showGuestDropwdown);
  };

  const hideOnClickOutside = (e) => {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setShowGuestDropwdown(false);
    }
  };

  const checkPassengerCounts = () => {
    if (isNaN(guestsSelected)) {
      setValidGuestsSelected(!validGuestsSeleced);
    } else {
      props.bookingFormData["guestsSelected"] = guestsSelected;
      navigate("/bookingForm", { state: props.bookingFormData });
    }
  };

  (async () => {
    for (let i = 1; i <= props.maxGuests; i++) {
      guestsArr[i] = i;
    }
  })();

  return (
    <div className="lg:w-1/2 mt-[1.8rem] lg:mt-0">
      <div>
        <h4 className="text-[#B4BBC1] text-[20px] mb-[2.2rem]">
          Price Details:
        </h4>
        <div className="bg-[#ffffff0d] p-[1.875rem] lg:p-[2.7rem] text-[10px] md:text-[16px] backdrop-blur-3xl border border-gray-700 flex flex-col gap-[1.875rem]">
          <div className="bg-slate-600 p-[1.875rem] rounded-2xl">
            <h4 className="mb-5">Guests</h4>
            <div ref={refOne} className="flex flex-col relative">
              <div
                className="flex justify-between  "
                onClick={guestSelectHandle}
              >
                <p className="text-white">{guestsSelected}</p>
                <img src={arrow} alt="dropdown-arrow" />
              </div>
              <ul
                className={
                  "flex flex-col absolute h-[280px] rounded-2xl md:h-[320px] w-full top-[2rem] overflow-y-scroll bg-slate-600 " +
                  (showGuestDropwdown ? " flex " : " hidden ")
                }
              >
                {guestsArr.map((data, index) => {
                  return (
                    <li
                      className="px-8 py-5 active:bg-slate-900 hover:bg-slate-700 text-start text-white"
                      key={index}
                      onClick={handleGuestsChange}
                    >
                      {data}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <h2 className="text-[#DAE0E5] text-[20px] md:text-[26px]">
            <span className="line-through  font-[400]">
              ₹{props.originalPrice}
            </span>
            ₹{props.discountedPrice}/night
          </h2>
          <button onClick={checkPassengerCounts} className="w-[100%]">
            Reserve
          </button>
          <p className="text-center">You won't be charged yet</p>
        </div>
      </div>
    </div>
  );
}

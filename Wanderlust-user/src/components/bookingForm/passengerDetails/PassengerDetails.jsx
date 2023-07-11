import React from "react";
import { useRef } from "react";
import "./style.scss";

export default function PassengerDetails(props) {
  const firstName = useRef();
  const lastName = useRef();
  const gender = useRef();
  const age = useRef();

  return (
    <div className="other-passenger-details flex flex-col gap-[1rem] md:gap-[2rem]">
      <p className="passenger-number text-[18px] ">Passenger : {props.count}</p>
      <input
        className={
          `first-name${props.iterator}` +
          " input-fields lg:px-[39px]  w-[100%]  px-[15px] py-[20px]  "
        }
        type="text"
        placeholder="First Name"
        ref={firstName}
      />

      <input
        className={
          `last-name${props.iterator}` +
          " input-fields lg:px-[39px]  w-[100%]  px-[15px] py-[20px]  "
        }
        type="text"
        placeholder="Last Name"
        ref={lastName}
      />
      <input
        className={
          `gender${props.iterator}` +
          " input-fields lg:px-[39px]  w-[100%]  px-[15px] py-[20px]  "
        }
        type="text"
        placeholder="Gender"
        ref={gender}
      />
      <input
        className={
          `age${props.iterator}` +
          " input-fields lg:px-[39px]  w-[100%]  px-[15px] py-[20px]  "
        }
        type="number"
        placeholder="Age"
        ref={age}
      />
    </div>
  );
}

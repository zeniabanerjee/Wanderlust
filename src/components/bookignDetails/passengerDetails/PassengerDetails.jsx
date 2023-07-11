import React from "react";
import "./style.scss";

export default function PassengerDetails(props) {
  return (
    <div>
      <p className="mb-5 break-all">{props.count}. Passenger Details</p>
      <p className="break-all">
        First Name : <span>{props.firstName}</span>
      </p>
      <p className="break-all">
        Last Name : <span>{props.lastName}</span>
      </p>
      <p className="break-all">
        Gender : <span>{props.gender}</span>
      </p>
      <p className="break-all">
        Age : <span>{props.age}</span>
      </p>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ProfileSideBar({ setActive, activePage }) {
  const [activeProfile, setProfileActivePage] = useState(false);

  useEffect(() => {
    if (activePage === "profile") {
      setProfileActivePage(true);
    } else if (activePage === "accounts") {
      setProfileActivePage(false);
    }
  });

  return (
    <ul className="flex xl:flex-col flex-row justify-center xl:justify-start gap-6 text-base">
      <li
        className={
          " grey-text" + (activeProfile ? " font-bold " : " font-normal ")
        }
      >
        <button
          onClick={() => {
            setActive("profile");
          }}
        >
          Profile
        </button>
      </li>
      <li
        className={
          " grey-text" + (activeProfile ? " font-normal " : " font-bold ")
        }
      >
        <button
          onClick={() => {
            setActive("view-account");
          }}
        >
          Account Details
        </button>
      </li>
      <li className=" grey-text">
        <Link to="/booking">My Booking</Link>
      </li>
    </ul>
  );
}

import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import CurrentBookingDetails from "../../components/CurrentBookingDetails/CurrentBookingDetails";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const BookingDetails = () => {
  const { userDetails, error, loading } = useSelector(
    (state) => state.userLogin
  );
  const navigate = useNavigate();
  useEffect(() => {
    if (userDetails === null) navigate("/");
  });
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="w-full bg-[#f5f9ff] h-screen overflow-auto">
        <Navbar heading="Booking Details" />
        <div className="flex flex-col">
          <CurrentBookingDetails />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default BookingDetails;

import React from "react";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import CurrentBookingDetails from "../../components/CurrentBookingDetails/CurrentBookingDetails";

const CancelBooking = () => {
  return (
    <div className="relative">
      <div className="flex">
        <Sidebar />
        <div className="w-full bg-[#f5f7f7] ">
          <Navbar heading="All Users"/>
          <div className="md:h-[90vh]">
            <CurrentBookingDetails />
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default CancelBooking;

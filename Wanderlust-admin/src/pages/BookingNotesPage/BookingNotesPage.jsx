import React, { useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Footer from "../../components/Footer/Footer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BookingNote from "../../components/BookingNote/BookingNote";

const BookingNotesPage = () => {
  const { userDetails } = useSelector((state) => state.userLogin);
  const navigate = useNavigate();

  useEffect(() => {
    if (userDetails === null) navigate("/");
  });
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="w-full bg-[#f5f9ff] h-screen overflow-auto md:pb-16">
        <Navbar heading="Booking Notes" />
        <div className="flex flex-col h-screen md:h-auto justify-between">
          <BookingNote />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default BookingNotesPage;

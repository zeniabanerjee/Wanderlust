import React, { useEffect } from "react";
import "./style.scss";
import Notification from "../../components/viewNotifications/Notification";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Footer from "../../components/footer/Footer";
const BookingList = () => {
  const { FrontendUserData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!FrontendUserData) navigate("/");
  });
  return (
    <header className="min-h-screen notification-page pt-[10rem]">
      <Notification />
      <Footer />
    </header>
  );
};

export default BookingList;

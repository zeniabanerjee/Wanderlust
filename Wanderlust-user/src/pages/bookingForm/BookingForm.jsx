import React, { useEffect } from "react";
import "./style.scss";
import Details from "../../components/bookingForm/details/Details";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Footer from "../../components/footer/Footer";

const BookingForm = (props) => {
  const location = useLocation();
  const bookingFormData = location.state;
  const { FrontendUserData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!FrontendUserData) navigate("/");
  });

  return (
    <header className="booking-form pt-[10rem] ">
      <Details bookingFormData={bookingFormData} />
      <Footer />
    </header>
  );
};

export default BookingForm;

import React, { useEffect } from "react";
import CancellationRequest from "../../components/CancellationRequest/CancellationRequest";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import LoadingScreen from "../../components/Loading/LoadingScreen";
import { getSingleBooking } from "../../redux/actions/bookingActions";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CancelNotification = () => {
  const { userDetails, error, loading } = useSelector(
    (state) => state.userLogin
  );
  const navigate = useNavigate();
  useEffect(() => {
    if (userDetails === null) navigate("/");
  });

  return (
    <>
      <div>
        <div className="flex h-screen">
          <Sidebar />
          <div className="w-full bg-[#f5f7f7] ">
            <Navbar heading="Notifications" />
            <div className="hscreen overflow-auto">
              <CancellationRequest />
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default CancelNotification;

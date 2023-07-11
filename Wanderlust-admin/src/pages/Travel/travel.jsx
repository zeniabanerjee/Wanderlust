import React, { useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Sidebar from "../../components/Sidebar/Sidebar";
import TravelType from "../../components/TravelType/TravelType";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Travel = () => {
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
      <div className="w-full bg-[#f5f9ff] overflow-auto md:pb-16">
        <Navbar heading="Travel Type List" />
        <div className="flex flex-col h-screen md:h-auto justify-between">
          <TravelType />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Travel;

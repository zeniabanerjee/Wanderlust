import React, { useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import TripList from "../../components/TripList/TripList";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const TripListPage = () => {
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
      <div className="w-full bg-[#f5f9ff] h-[100vh] overflow-auto md:pb-16">
        <Navbar heading="List Of Trips" />
        <div className="flex flex-col h-screen md:h-auto justify-between">
          <TripList />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default TripListPage;

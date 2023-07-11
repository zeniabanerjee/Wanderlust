import React, { useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import AmenitiesTable from "../../components/Amenities/Amenities";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AmenitiesPage = () => {
  const { userDetails, error, loading } = useSelector(
    (state) => state.userLogin
  );
  const navigate = useNavigate();
  useEffect(() => {
    if (userDetails === null) navigate("/");
  });
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full bg-[#f5f9ff] h-screen overflow-scroll md:pb-16">
        <Navbar heading="All Amenities" />
        <div className="flex flex-col h-screen md:h-auto justify-between">
          <AmenitiesTable />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default AmenitiesPage;

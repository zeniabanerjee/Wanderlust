import React, { useEffect } from "react";
import NewTripForm from "../../components/NewTripForm/NewTripForm";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AddNewTrip = () => {
  const { userDetails, error, loading } = useSelector(
    (state) => state.userLogin
  );
  const navigate = useNavigate();
  useEffect(() => {
    if (userDetails === null) navigate("/");
  });
  return (
    <div className="flex h-screen overflow-auto">
      <Sidebar />
      <div className="w-full h-screen overflow-auto md:pb-16 ">
        <Navbar heading="Add New Trip" />
        <div className="p-5 lg:px-10 lg:py-5">
          <NewTripForm />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default AddNewTrip;

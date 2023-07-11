import React, { useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import UpdateTripForm from "../../components/UpdatetripForm/UpdateTripForm";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";

const UpdateTrip = () => {
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
      <div className="w-full h-screen overflow-auto md:pb-16 ">
        <Navbar heading="Edit Trip" />
        <div className="p-5 lg:px-10 lg:py-5">
          <UpdateTripForm />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default UpdateTrip;

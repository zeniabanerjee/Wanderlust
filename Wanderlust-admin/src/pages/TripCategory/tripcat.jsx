import React, { useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import Trip from "../../components/Trip/Trip";
import Footer from "../../components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Tripcat = () => {
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
      <div className="w-full bg-[#f5f9ff]  overflow-auto md:pb-16">
        <Navbar heading="Trip Categories" />
        <div className="flex flex-col h-screen md:h-auto justify-between">
          <Trip />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Tripcat;

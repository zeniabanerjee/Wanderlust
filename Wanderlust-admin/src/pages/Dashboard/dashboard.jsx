import React, { useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import User from "../../components/Users/user";
import Footer from "../../components/Footer/Footer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
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
      <div className="w-full bg-[#f5f9ff] h-screen overflow-auto md:pb-16">
        <Navbar heading="All Users" />
        <div className="flex flex-col h-screen md:h-auto justify-between">
          <User />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

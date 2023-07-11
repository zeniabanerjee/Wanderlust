import React, { useEffect, useState } from "react";
import "./style.scss";
import ResetPassword from "../../components/landingPage/resetPassword/ResetPassword.jsx";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import SweetAlert from "../../components/alert/sweetAlert";
import Footer from "../../components/footer/Footer";

const ResetPasswordPage = () => {
  const url = useLocation();
  const [response, setResponse] = useState();

  const validation = async () => {
    try {
      const res = await axios.get(`http://localhost:7000${url.pathname}`);
      setResponse(res);
    } catch (err) {
      SweetAlert("error", err?.response?.data?.message);
    }
  };

  useEffect(() => {
    validation();
  }, []);
  if (response?.data?.success) {
    return (
      <header className="landing-page reset-password-page flex flex-col h-screen">
        <ResetPassword />
        <Footer />
      </header>
    );
  } else {
    return (
      <div className="text-center  py-[30rem] md:py-[20rem]">
        <h1 className="text-5xl leading-[5rem]">
          <span className="text-red-700">Oops</span> Something's Wrong, <br />{" "}
          With Status Code : {response?.status}
        </h1>
        <Link
          to="/searchResult"
          className="my-10 block w-[15rem] border border-green-400 hover:text-white hover:bg-green-900 text-2xl px-5 py-2 mx-auto"
        >
          Take Me Back?
        </Link>
        <Footer />
      </div>
    );
  }
};

export default ResetPasswordPage;

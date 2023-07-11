import React, { useEffect, useState } from "react";
import Router from "../../Routes";
import "./style.scss";
import axios from "axios";
import LoginBanner from "../../components/AdminLogin/LogInHeader/AdminLoginBanner.jsx";
import NavBarLogin from "../../components/AdminLogin/LoginNavbar/NavBarLogin.jsx";
import NavBarSigninForm from "../../components/AdminLogin/NavBarLoginForm/NavBarLoginForm";
import ResetPassword from "../../components/AdminLogin/ResetPassword/ResetPassword.jsx";
import Footer from "../../components/AdminLogin/FooterComponent/Footer.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import PageError from "../../components/Error/PageError";

const AdminResetPassword = () => {
  const navigate = useNavigate();
  const url = useLocation();
  const [res, setRes] = useState();

  const validation = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_NODE_API}${url.pathname}`
    );
    setRes(response);
    if (response.data.success === false) {
    }
  };


  useEffect(() => {
    validation();
  }, []);

  return (
    <>
    {
      res?.data?.success === true?
      <header className="login-page flex">
        <LoginBanner />
        <div className="signin-container flex flex-col bg-white">
          <NavBarLogin />
          <div className="flex flex-col my-auto mt-[5rem] lg:mt-[8rem] justify-center items-center">
            <ResetPassword />
            <NavBarSigninForm />
          </div>
          <Footer />
        </div>
      </header>
      :
      
       <PageError/>
      
    }
    </>
    
  )
};

export default AdminResetPassword;

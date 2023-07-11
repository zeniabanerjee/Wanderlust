import React, { useState, useRef, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import "./style.scss";
import mail from "../../../assets/images/adminLogin/singinForm/mail.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AlertComponent from "../../Alerts/AlertComponent";
import { validEmail } from "../../../constants/regex";

const URL = process.env.REACT_APP_NODE_API;

const ForgotPassword = () => {
  const emailRef = useRef();
  const [apiMessage, setApiMessage] = useState("");
  const navigate = useNavigate();
  const runningPort = window.location.port;

  const handleEmailValidation = () => {
    try {
      if (!validEmail.test(emailRef.current.value)) {
        throw new Error("Please Enter a valid E-mail!");
      } else {
        document.getElementById("validEmail").textContent = "";
      }
    } catch (err) {
      document.getElementById("validEmail").textContent = err.message;
    }
  };

  const buttonClick = async () => {
    try {
      if (emailRef.current.value) {
        const body = {
          email: emailRef.current.value,
          port: runningPort,
        };
        const response = await axios.post(
          `${URL}/send-reset-mail/Backend-user`,
          body
        );
        setApiMessage(response?.data);
      } else {
        AlertComponent("warning", "", "Enter a Valid Email");
      }
    } catch (error) {
      setApiMessage(error?.response?.data);
    }
  };

  useEffect(() => {
    if (apiMessage?.success) {
      AlertComponent("success", apiMessage);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } else if (apiMessage?.success === false) {
      AlertComponent("failed", apiMessage);
    }
  }, [apiMessage]);

  return (
    <div className=" my-auto forgot-password-form flex flex-col items-center justify-center">
      <div className="flex flex-col w-[300px] xl:w-[360px]">
        <h2 className="text-[34px] ">Reset Password</h2>
        <p>
          Enter the email associated with your account and we will send an email
          with instructions to reset your password.
        </p>
        <form action="">
          <p className="mt-[47px] text-[14px]">Email Address</p>
          <div className="flex flex-col relative">
            <div className="bg-white input-fields px-[23px] py-[15px] mt-[9px] flex flex-row items-center justify-between">
              <input
                className="bg-transparent rounded-md outline-none"
                type="text"
                placeholder="Enter you email"
                ref={emailRef}
                onChange={handleEmailValidation}
              />
              <button type="button">
                <img className="input-icon" src={mail} alt="mail-icon" />
              </button>
            </div>
            <h4
              id="validEmail"
              className="text-red-800 bg-transparent text-md absolute mt-[4rem] "
            ></h4>
          </div>
          <Link
            className="mt-[27px] py-[15px] text-center send-link-button"
            onClick={buttonClick}
          >
            Send Link
          </Link>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;

import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./style.scss";
import axios from "axios";
import SweetAlert from "../../alert/sweetAlert";
import ProfileSideBar from "../profileSideBar/ProfileSideBar";
import SignOut from "../../SignOut/SignOut";
import {
  mediumRegexPassword,
  strongRegexPassword,
} from "../../../constants/regex";
import { ClassNameConfigurator } from "@mui/base";

export default function EditAccountDetails({ setActive }) {
  const { FrontendUserData } = useSelector((state) => state.user);
  const [checkPass, setCheckPass] = useState(true);
  const [newPasswordValid, setNewPasswordValid] = useState(false);
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(false);
  const [pwdError, setPwdError] = useState(false);

  const oldPassRef = useRef();
  const newPassRef = useRef();
  const confirmNewPassRef = useRef();
  const phoneRef = useRef();
  const emailId = FrontendUserData?.data?.userDetails?.email;

  const updateDetailsHandler = async () => {
    try {
      if (!oldPassRef.current.value.length) {
        document
          .getElementById("oldPasswordField")
          .classList.toggle("border-red-500");
      } else if (!newPassRef.current.value.length) {
        document
          .getElementById("newPasswordField")
          .classList.toggle("border-red-500");
      } else if (!confirmNewPassRef.current.value.length) {
        document
          .getElementById("confirmPasswordField")
          .classList.toggle("border-red-500");
      } else {
        document
          .getElementById("oldPasswordField")
          .classList.toggle("border-transparent");
        document
          .getElementById("confirmPasswordField")
          .classList.toggle("border-transparent");
        document
          .getElementById("newPasswordField")
          .classList.toggle("border-transparent");

        if (newPassRef.current.value === oldPassRef.current.value) {
          setNewPasswordValid(false);
          throw new Error("Old Password and New Password cannot be same!");
        } else {
          setNewPasswordValid(true);
          document.getElementById("newPassword").textContent = "";
          updatePasswords();
        }
      }
    } catch (err) {
      document.getElementById("newPassword").textContent = err.message;
    }
  };

  const updatePasswords = async () => {
    const verifyOldPassUrl = `${process.env.REACT_APP_API_HOST}login/${FrontendUserData.data.userDetails.userType}`;
    const updateUPassUrl = `${process.env.REACT_APP_API_HOST}set-password/${FrontendUserData.data.userDetails.userType}`;
    if (newPasswordValid && confirmPasswordValid && !pwdError) {
      try {
        const checkOldPass = await axios.post(verifyOldPassUrl, {
          email: emailId,
          password: oldPassRef.current.value,
        });
        if (checkOldPass.data.success) {
          setCheckPass(true);
          const updatePassRes = await axios.post(updateUPassUrl, {
            logInStatus: true,
            id: FrontendUserData.data.userDetails._id,
            newPassword: newPassRef.current.value,
          });
          if (updatePassRes?.data?.success) {
            setActive("view-account");
            SweetAlert("success", updatePassRes.data.message);
          } else SweetAlert("error", updatePassRes.data.message);
        }
      } catch (err) {
        SweetAlert("warning", "", err.response.data.message);
        setCheckPass(false);
      }
    }
  };

  const checkValidPassword = () => {
    handlePasswordCheck();
    try {
      if (strongRegexPassword.test(newPassRef.current.value)) {
        setPwdError(false);
        document.getElementById("validPassword").textContent =
          "Password Strength : Strong!";
      } else {
        if (mediumRegexPassword.test(newPassRef.current.value)) {
          setPwdError(true);
          throw new Error("Password Strength : Medium!");
        } else {
          setPwdError(true);
          throw new Error("Password Strength : Weak!");
        }
      }
    } catch (err) {
      document.getElementById("validPassword").textContent = err.message;
    }
  };

  const handlePasswordCheck = () => {
    try {
      if (newPassRef.current.value === confirmNewPassRef.current.value) {
        setConfirmPasswordValid(true);
        document.getElementById("confirmPassword").textContent = "";
      } else {
        setConfirmPasswordValid(false);
        throw new Error("Passwords doesn't match!");
      }
    } catch (err) {
      document.getElementById("confirmPassword").textContent = err.message;
    }
  };

  if (FrontendUserData) {
    return (
      <header className="sm:mx-20 2xl:mx-[18.75rem] ">
        <div className=" flex justify-between px-10 xl:px-0 lg:text-[20px]">
          <div className="flex">
            <h2
              className="font-[600]"
              onClick={() => {
                setActive("view-account");
              }}
            >
              Settings/
            </h2>
            <span className="font-[400] grey-text"> Accounts Page</span>
          </div>
          <SignOut />
        </div>
        <div className="mt-[2rem] xl:mt-[1.5rem] flex flex-col xl:flex-row xl:justify-between gap-6 xl:gap-10 lg:text-[16px] xl:flex ">
          <ProfileSideBar activePage={"accounts"} setActive={setActive} />
          <div className="edit-details flex flex-col gap-[1rem] lg:text-[18px]  p-5 lg:p-10 2xl:p-[2.2rem] rounded-2xl xl:w-[80%] backdrop-blur-sm">
            <h2 className="font-[600]">Login Details</h2>
            <h5 className="mb-[2rem] text-[1rem] grey-text">
              Manage your email address mobile number and password
            </h5>
            <h4 className="">Mobile Number</h4>
            <input
              type="text"
              className=" "
              defaultValue={FrontendUserData.data.userDetails.phone}
              disabled={true}
            />
            <h4 className="">Email ID</h4>
            <input
              type="text"
              className=" "
              defaultValue={emailId}
              disabled={true}
            />
            <h4 className={""}>Old Password</h4>
            <input
              id="oldPasswordField"
              type="password"
              className={
                " border-[3px]  " +
                (!checkPass ? "  border-red-500  outline-red-500 " : "")
              }
              ref={oldPassRef}
            />
            <h4
              id="newPassword"
              className="text-red-700 font-bold bg-transparent text-xl"
            ></h4>
            <h4 className={""}>New Password</h4>
            <input
              id="newPasswordField"
              type="password"
              className=" border-[3px] "
              onChange={checkValidPassword}
              ref={newPassRef}
            />
            <h4
              id="validPassword"
              className={
                "font-bold bg-transparent text-xl " +
                (pwdError ? "text-red-700" : "text-green-700")
              }
            ></h4>
            <h4 className="">Confirm Password</h4>
            <input
              id="confirmPasswordField"
              type="password"
              className="  border-[3px] "
              ref={confirmNewPassRef}
              onChange={handlePasswordCheck}
            />
            <h4
              id="confirmPassword"
              className="text-red-700 font-bold bg-transparent text-xl"
            ></h4>
            <button
              className="mt-[1rem] rounded-2xl text-white bg-[#219653] text-center py-4 xl:py-[1rem] xl:mx-[4rem]"
              onClick={updateDetailsHandler}
            >
              SUBMIT
            </button>
          </div>
        </div>
      </header>
    );
  } else {
    return (
      <div className="text-center  py-[30rem] md:py-[20rem]">
        <h1 className="text-5xl leading-[5rem]">
          <span className="text-red-700">Oops</span> Something's Wrong, <br />{" "}
          With Status Code : {FrontendUserData.status}
        </h1>
        <Link
          to="/searchResult"
          className="my-10 block w-[15rem] border border-green-400 hover:text-white hover:bg-green-900 text-2xl px-5 py-2 mx-auto"
        >
          Take Me Back?
        </Link>
      </div>
    );
  }
}

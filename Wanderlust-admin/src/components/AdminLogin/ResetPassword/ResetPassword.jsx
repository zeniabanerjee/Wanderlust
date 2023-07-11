import React, { useRef, useState } from "react";
import "./style.scss";
import axios from "axios";
import eyeIcon from "../../../assets/images/adminLogin/singinForm/view.svg";
import { useNavigate, useParams } from "react-router-dom";
import {
  mediumRegexPassword,
  strongRegexPassword,
} from "../../../constants/regex";
import swal from "sweetalert2";
import AlertComponent from "../../Alerts/AlertComponent";

const ResetPassword = () => {
  const password = useRef();
  const confirmPassword = useRef();
  const resetNewPassword = {};
  const [differentPassword, setDifferentPassword] = useState(false);
  const [emptyFieldMessage, setEmptyFieldMessage] = useState(false);
  const [pwdError, setPwdError] = useState(false);
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(false);

  const params = useParams();
  const navigate = useNavigate();

  const updatePassHandler = async () => {
    resetNewPassword["newPassword"] = password.current.value;
    resetNewPassword["id"] = params.id;
    resetNewPassword["token"] = params.token;

    try {
      if (!pwdError && confirmPasswordValid) {
        if (
          password.current.value.length &&
          confirmPassword.current.value.length
        ) {
          const response = await axios.post(
            `${process.env.REACT_APP_NODE_API}/set-password/Backend-user`,
            resetNewPassword
          );
          if (response?.data?.success) {
            AlertComponent("success", response?.data, "");
            localStorage.removeItem("password");
            setTimeout(() => {
              navigate("/");
            }, 2000);
          }
        }
      } else {
        AlertComponent("warning", "", "Fields can't be empty");
      }
    } catch (err) {}
  };


  const checkValidPassword = () => {
    try {
      if (strongRegexPassword.test(password.current.value)) {
        setPwdError(false);
        document.getElementById("validPassword").textContent =
          "Password Strength : Strong!";
      } else {
        if (mediumRegexPassword.test(password.current.value)) {
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
      if (password.current.value === confirmPassword.current.value) {
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

  return (
    <div className=" my-auto reset-password-form flex flex-col items-center justify-center">
      <div className="flex flex-col w-[300px] xl:w-[360px]">
        <h2 className="text-[34px] ">Set your New Password</h2>
        <p>Your new password must be different from previous used password.</p>
        <div>
          <p className="mt-[47px] text-[14px]">New Password</p>
          <div className="flex flex-col relative">
            <div className="bg-white input-fields px-[23px] py-[15px] mt-[9px] flex flex-row items-center justify-between">
              <input
                className="bg-transparent  rounded-md outline-none w-[100%]"
                type="text"
                placeholder="Enter your password"
                ref={password}
                onChange={checkValidPassword}
              />
              <button type="button">
                <img className="input-icon" src={eyeIcon} alt="mail-icon" />
              </button>
            </div>
            <h4
              id="validPassword"
              className={
                "font-bold bg-transparent text-md absolute mt-[4rem] " +
                (pwdError ? "text-red-700" : "text-green-700")
              }
            ></h4>
          </div>
          <p className="mt-[47px] text-[14px]">Confirm Password</p>
          <div className="flex flex-col relative">
            <div className="bg-white input-fields px-[23px] py-[15px] mt-[9px] flex flex-row items-center justify-between">
              <input
                className="bg-transparent rounded-md outline-none w-[100%]"
                type="text"
                placeholder="Confirm your password"
                ref={confirmPassword}
                onChange={handlePasswordCheck}
              />
              <button type="button">
                <img className="input-icon" src={eyeIcon} alt="mail-icon" />
              </button>
            </div>
            <h4
              id="confirmPassword"
              className="text-red-700 font-bold bg-transparent absolute mt-[4rem] text-md"
            ></h4>
          </div>

          <button
            className="mt-[27px] py-[15px] hover:bg-[#a92323] transition-colors duration-500 text-center reset-password-button"
            onClick={updatePassHandler}
          >
            Reset Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;

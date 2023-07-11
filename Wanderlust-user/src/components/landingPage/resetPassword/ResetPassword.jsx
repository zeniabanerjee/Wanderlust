import React, { useRef, useState } from "react";
import "./style.scss";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import eye from "../../../assets/images/landingPage/loginForm/eye.svg";
import {
  mediumRegexPassword,
  strongRegexPassword,
} from "../../../constants/regex";
import SweetAlert from "../../alert/sweetAlert";

const ResetPassword = () => {
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const [emptyFieldMessage, setEmptyFieldsMessage] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [pwdError, setPwdError] = useState(false);
  const [differentPassword, setDifferentPassword] = useState(false);
  const url = useLocation();
  const resetPasswordData = {};
  const navigate = useNavigate();
  const params = useParams();

  const checkValidPassword = () => {
    try {
      if (strongRegexPassword.test(passwordRef.current.value)) {
        setPwdError(false);
        document.getElementById("validPassword").textContent =
          "Password Strength : Strong!";
      } else {
        if (mediumRegexPassword.test(passwordRef.current.value)) {
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
      if (passwordRef.current.value === confirmPasswordRef.current.value) {
        document.getElementById("confirmPassword").textContent = "";
        setDifferentPassword(false);
      } else {
        setDifferentPassword(true);
        throw new Error("Passwords don't match!");
      }
    } catch (err) {
      document.getElementById("confirmPassword").textContent = err.message;
    }
  };

  return (
    <header className="flex flex-col reset-password justify-center items-center mt-[100px] my-auto">
      <h2 className="md:text-[45px] text-center mt-[10px] lg:mt-[30px] text-[30px]">
        Reset your password
      </h2>
      <div className="flex flex-col lg:w-[900px] w-[90%] md:p-10 login-details px-[25px] py-[15px] lg:py-[45px] lg:px-[60px] justify-center mt-10">
        <div className=" input-fields px-[25px]  flex flex-row items-center justify-between">
          <input
            className="w-[100%] bg-transparent  px-[15px] py-[15px]  "
            type={showPassword ? "" : "password"}
            placeholder="New Password"
            ref={passwordRef}
            onChange={checkValidPassword}
          />
          <button
            type="button"
            onClick={() => {
              setShowPassword(!showPassword);
            }}
          >
            <img className="input-icon" src={eye} alt="view-icon" />
          </button>
        </div>
        <h4
          id="validPassword"
          className={
            "font-bold bg-transparent text-[16px] " +
            (pwdError ? "text-red-700" : "text-green-700")
          }
        ></h4>
        <div className=" input-fields px-[25px]  flex flex-row items-center justify-between mt-[25px]">
          <input
            className="w-[100%] bg-transparent  px-[15px] py-[15px] "
            type={"password"}
            placeholder="Confirm Password"
            ref={confirmPasswordRef}
            onChange={handlePasswordCheck}
          />
        </div>
        <h4
          id="confirmPassword"
          className="text-red-700 font-bold bg-transparent text-[16px]"
        ></h4>
        <button
          className="lg:mt-[27px] mt-[20px] px-[15px] py-[20px]  text-center save-button"
          onClick={async () => {
            resetPasswordData["newPassword"] = passwordRef.current.value;
            resetPasswordData["id"] = params.id;
            resetPasswordData["token"] = params.token;
            if (
              passwordRef.current.value.length &&
              confirmPasswordRef.current.value &&
              pwdError === false &&
              !differentPassword
            ) {
              const response = await axios.post(
                `http://localhost:7000/set-password/Frontend-user`,
                resetPasswordData
              );
              if (response?.data?.success) {
                SweetAlert("success", response?.data?.message);
                setTimeout(() => {
                  navigate("/");
                }, 2000);
              }
            }
          }}
        >
          SAVE
        </button>
      </div>
    </header>
  );
};

export default ResetPassword;

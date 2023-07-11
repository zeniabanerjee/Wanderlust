import React, { useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.scss";
import mail from "../../../assets/images/adminLogin/singinForm/mail.svg";
import view from "../../../assets/images/adminLogin/singinForm/view.svg";
import Cookies from "js-cookie";
import { getUsers } from "../../../redux/actions/userActions";
import { useSelector, useDispatch } from "react-redux";
import LoadingScreen from "../../Loading/LoadingScreen";
import AlertComponent from "../../Alerts/AlertComponent";
import { validEmail } from "../../../constants/regex";

export default function LoginForm() {
  const navigate = useNavigate();
  const details = {};
  const emailRef = useRef();
  const passwordRef = useRef();
  const [showPassword, setshowPassword] = useState(false);
  const [apiMessage, setapiMessage] = useState("");
  const [emptyFieldMessage, setemptyFeildMessage] = useState(false);
  const { userDetails, error, loading } = useSelector(
    (state) => state.userLogin
  );
  const dispatch = useDispatch();
  const [checked, setchecked] = useState(
    localStorage.getItem("rememberMe") === "true" ? true : false
  );

  useEffect(() => {
    if (userDetails?.success) {
      handleRemember(userDetails);
      navigate("/dashboard");
    } else if (userDetails?.success === false) {
      AlertComponent("failed", userDetails);
    }
  }, [userDetails]);

  useEffect(() => {
    if (error) {
      setapiMessage(error);
      AlertComponent("error", error);
      dispatch({ type: "ADMIN_FAILED", payload: null });
    }
  }, [error]);

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

  const handleRemember = (userDetails) => {
    if (checked) {
      localStorage.setItem("email", emailRef.current.value);
      localStorage.setItem("password", passwordRef.current.value);
      localStorage.setItem("token", userDetails.data.token);

      localStorage.setItem("rememberMe", checked);
    } else {
      localStorage.removeItem("email", emailRef.current.value);
      localStorage.removeItem("password", passwordRef.current.value);
      localStorage.removeItem("token", userDetails.data.token);

      localStorage.setItem("rememberMe", checked);
    }
    localStorage.setItem("userType", userDetails.data.userDetails.userType);
    localStorage.setItem("userName", userDetails.data.userDetails.userName);
    Cookies.set("TOKEN", userDetails.data.token, { expires: 7 });
  };

  const signInHandler = () => {
    details["email"] = emailRef.current.value;
    details["password"] = passwordRef.current.value;
    if (emailRef.current.value.length && passwordRef.current.value) {
      setemptyFeildMessage(false);
      dispatch(getUsers(emailRef.current.value, passwordRef.current.value));
    } else {
      AlertComponent("warning", "", "All fields are Required");
    }
  };

  return (
    <>
      {loading && <LoadingScreen />}
      <div className=" signin-form flex flex-col items-center justify-center">
        <div className="flex flex-col w-[300px] xl:w-[360px]">
          <h2 className="text-[34px] ">
            Sign in to <br /> your Account
          </h2>
          <form>
            <p className="mt-[47px] text-[14px]">Email Address</p>
            <div className="flex flex-col relative">
              <div className="bg-white input-fields px-[23px]  mt-[9px] flex flex-row items-center justify-between">
                <input
                  className="bg-transparent rounded-md w-[100%] py-[15px] outline-none"
                  type="text"
                  placeholder="Enter you email"
                  ref={emailRef}
                  onChange={handleEmailValidation}
                  defaultValue={
                    localStorage.getItem("email")
                      ? localStorage.getItem("email")
                      : ""
                  }
                />
                <button type="button">
                  <img className="input-icon" src={mail} alt="mail-icon" />
                </button>
              </div>
              <h4
                id="validEmail"
                className="text-red-800 bg-transparent text-md absolute mt-[4rem]"
              ></h4>
            </div>
            <div className="flex flex-row mt-[26px] justify-between text-[14px] items-center">
              <p>Password</p>
              <Link className="text-[#727A86]" to="/forgot-password">
                Forgot Password?
              </Link>
            </div>
            <div className="bg-white input-fields px-[23px] mt-[9px] flex flex-row items-center justify-between">
              <input
                className="bg-transparent rounded-md w-[100%] py-[15px] outline-none"
                type={showPassword ? "text" : "password"}
                placeholder="Enter you password"
                ref={passwordRef}
                defaultValue={
                  localStorage.getItem("password")
                    ? localStorage.getItem("password")
                    : ""
                }
              />
              <button
                type="button"
                onClick={() => {
                  setshowPassword(!showPassword);
                }}
              >
                <img className="input-icon" src={view} alt="view-icon" />
              </button>
            </div>
            <p className="hidden mt-[15px]">
              Opps! The password you entered is incorrect.
            </p>
            <div className="flex flex-row mt-[26px] text-[14px] gap-[11px]">
              <input
                type="checkbox"
                name="remember-me"
                value="yes"
                defaultChecked={checked}
                onChange={() => {
                  setchecked(!checked);
                }}
              />
              Remember Me
            </div>
            <button
              className="mt-[27px] py-[15px] hover:bg-[#a92323] transition-colors duration-500 text-center signin-button"
              onClick={(e) => {
                e.preventDefault();

                signInHandler();
              }}
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

import React, { useEffect, useRef, useState } from "react";
import "./style.scss";
import { Link, useNavigate } from "react-router-dom";
import eye from "../../../assets/images/landingPage/loginForm/eye.svg";
import Cookies from "js-cookie";
import { signIn, updateUserDetails } from "../../../redux/slices/userSlice";
import { useSelector, useDispatch } from "react-redux";
import SweetAlert from "../../alert/sweetAlert";
import LoadingScreen from "../../loading/loadingScreen";
import { validEmail } from "../../../constants/regex";

const LoginForm = () => {
  const navigate = useNavigate();
  const [showPassword, setshowPassword] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const accDetails = {};
  const dispatch = useDispatch();
  const { FrontendUserData, error, loading, success } = useSelector(
    (state) => state.user
  );
  const [checked, setChecked] = useState(
    localStorage.getItem("rememberMe") === "true" ? true : false
  );

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

  const handleRemember = (FrontendUserData) => {
    if (checked) {
      localStorage.setItem("email", emailRef.current.value);
      localStorage.setItem("password", passwordRef.current.value);
      localStorage.setItem("id", FrontendUserData.data.userDetails._id);
      localStorage.setItem(
        "userType",
        FrontendUserData.data.userDetails.userType
      );
      localStorage.setItem("rememberMe", checked);
    } else {
      localStorage.removeItem("email", emailRef.current.value);
      localStorage.removeItem("password", passwordRef.current.value);
      localStorage.removeItem("id", FrontendUserData.data.userDetails._id);
      localStorage.removeItem(
        "userType",
        FrontendUserData.data.userDetails.userType
      );
      localStorage.setItem("rememberMe", checked);
    }
    Cookies.set("TOKEN", FrontendUserData?.data?.token, { expires: 7 });
  };

  const logInHandler = async () => {
    accDetails["email"] = emailRef.current.value;
    accDetails["password"] = passwordRef.current.value;

    if (!!emailRef.current.value.length && !!passwordRef.current.value.length) {
      dispatch(signIn(accDetails));
    } else {
      SweetAlert("warning", "", "Fields cannot be Empty!");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("FrontendUserData")) navigate("/searchResult");
  }, []);

  useEffect(() => {
    if (success) {
      handleRemember(FrontendUserData);
      navigate("/searchResult");
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      SweetAlert("error", error);
      dispatch(updateUserDetails());
    }
  }, [error]);

  return (
    <>
      {loading && <LoadingScreen />}
      <header className="flex flex-col login-form justify-center items-center my-auto">
        <p className="md:text-[24px]">Signin</p>

        <h2 className="text-center mt-[10px] lg:mt-[15px] text-[40px]">
          Welcome to Wanderlust
        </h2>

        <div className="flex flex-col lg:w-[900px] w-[90%] md:px-[20px] md:py-[20px] mt-[15px]  gap-[1rem] lg:gap-[1.3rem] login-details px-[20px] py-[20px] lg:py-[40px] lg:px-[40px] justify-center">
          <input
            className="  input-fields p-[1.2rem] w-[100%]"
            type="text"
            placeholder="Enter Email ID"
            ref={emailRef}
            defaultValue={
              localStorage.getItem("email") ? localStorage.getItem("email") : ""
            }
            onChange={handleEmailValidation}
          />
          <h4
            id="validEmail"
            className="text-red-800 bg-transparent text-xl"
          ></h4>

          <div className=" input-fields pr-[15px] flex flex-row items-center justify-between">
            <input
              className=" p-[1.2rem] w-[100%] bg-transparent"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
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
              <img className="input-icon" src={eye} alt="view-icon" />
            </button>
          </div>
          <div className="flex flex-row  text-[14px] gap-[11px]">
            <input
              type="checkbox"
              name="remember-me"
              value="yes"
              defaultChecked={checked}
              onChange={() => setChecked(!checked)}
            />
            <p className="grey-text">Remember Me</p>
          </div>
          <button
            className=" px-[15px] py-[15px] text-center continue-button"
            onClick={logInHandler}
          >
            CONTINUE
          </button>
          <div className="flex justify-between">
            <Link className="text-center grey-text " to="/setPassword">
              Forget Password
            </Link>
            <Link className="text-center lg:text[25px  grey-text" to="/signup">
              Create Account
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};

export default LoginForm;

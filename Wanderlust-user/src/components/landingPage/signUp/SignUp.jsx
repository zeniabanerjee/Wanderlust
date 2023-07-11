import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.scss";
import eye from "../../../assets/images/landingPage/loginForm/eye.svg";
import { useSelector, useDispatch } from "react-redux";
import { signUp, updateUserDetails } from "../../../redux/slices/userSlice";
import {
  validEmail,
  mediumRegexPassword,
  strongRegexPassword,
} from "../../../constants/regex";
import swal from "sweetalert2";
import SweetAlert from "../../alert/sweetAlert";
import { useSlider } from "@mui/base";

const generateCaptcha = () => {
  const randomText = Math.random().toString(36).substring(2, 8);
  return randomText;
};

const SignUp = () => {
  const navigate = useNavigate();
  const emailRef = useRef();
  const phoneNoRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowCofirmPassword] = useState(false);
  const [differentPassword, setDifferentPassword] = useState(false);
  const [captchaText, setCaptchaText] = useState(generateCaptcha());
  const [userInput, setUserInput] = useState("");
  const [isValidCaptcha, setIsValidCaptcha] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  let [apiMessage, setApiMessage] = useState("");
  const [pwdError, setPwdError] = useState(false);

  const newUserDetails = {};
  const dispatch = useDispatch();

  const { FrontendUserData, error, loading, success } = useSelector(
    (state) => state.user
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

  const handlePhoneNumberValidation = () => {
    try {
      if (phoneNoRef.current.value.length > 10) {
        throw new Error("Please Enter a valid Phone number!");
      } else {
        document.getElementById("validPhone").textContent = "";
      }
    } catch (err) {
      document.getElementById("validPhone").textContent = err.message;
    }
  };

  const inputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handlePasswordCheck = () => {
    try {
      if (passwordRef.current.value === confirmPasswordRef.current.value) {
        setDifferentPassword(false);
        document.getElementById("confirmPassword").textContent = "";
      } else {
        setDifferentPassword(true);
        throw new Error("Passwords don't match!");
      }
    } catch (err) {
      document.getElementById("confirmPassword").textContent = err.message;
    }
  };

  const checkCaptcha = (e) => {
    e.preventDefault();
    if (userInput === captchaText) {
      setIsValidCaptcha(true);
      setIsChecked(true);
    } else {
      setIsValidCaptcha(false);
      setCaptchaText(generateCaptcha());
      setUserInput("");
    }
  };

  const handleCreateNewAccount = async (e) => {
    e.preventDefault();
    if (
      !emailRef.current.value.length ||
      !phoneNoRef.current.value.length ||
      !passwordRef.current.value.length ||
      !confirmPasswordRef.current.value.length
    ) {
      SweetAlert("warning", "", "Fields cannot be Empty!");
    } else if (!differentPassword && !pwdError) {
      newUserDetails["email"] = emailRef.current.value;
      newUserDetails["phone"] = phoneNoRef.current.value;
      newUserDetails["password"] = passwordRef.current.value;

      dispatch(signUp(newUserDetails));
    }
  };

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

  useEffect(() => {
    if (FrontendUserData?.success) {
      swal.fire({
        position: "center",
        icon: "success",
        title: "Success",
        text: FrontendUserData.message,
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
      dispatch(updateUserDetails());
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [FrontendUserData]);

  useEffect(() => {
    if (error) {
      SweetAlert("error", error);
    }
  }, [error]);

  return (
    <header className=" signup-form justify-center items-center my-auto]">
      <p className="md:text-[28px] text-center">Sign up</p>
      <h2 className="md:text-[40px] text-center mt-[10px] lg:mt-[30px] text-[32px]">
        Welcome to Trouvaille
      </h2>
      <div className="mx-auto flex flex-col gap-[30px] lg:w-[900px] w-[90%] md:px-[30px] md:py-[30px] mt-[15px] signup-details px-[20px] py-[20px] lg:py-[40px] lg:px-[40px] justify-center ">
        <div className="flex flex-col relative">
          <input
            className="input-fields py-[1rem] px-[1.5rem] bg-transparent w-[100%]"
            type="text"
            placeholder="Email ID"
            ref={emailRef}
            onChange={handleEmailValidation}
          />
          <h4
            id="validEmail"
            className="text-red-600 bg-transparent text-[16px] absolute mt-[3.3rem]"
          ></h4>
        </div>
        <div className="flex flex-col relative">
          <input
            className=" input-fields phone-field  py-[1rem] px-[1.5rem]  w-[100%]"
            type="number"
            placeholder="Phone Number"
            ref={phoneNoRef}
            onChange={handlePhoneNumberValidation}
          />
          <h4
            id="validPhone"
            className="text-red-600 bg-transparent text-[16px] absolute mt-[3.3rem]"
          ></h4>
        </div>
        <div className="flex flex-col relative">
          <div className=" input-fields px-[25px] flex flex-row items-center justify-between">
            <input
              className="bg-transparent py-[1rem]  w-[100%] password-field"
              type={showPassword ? "" : "password"}
              placeholder="Password"
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
              "font-bold bg-transparent text-[16px] absolute mt-[3.3rem] " +
              (pwdError ? "text-red-700" : "text-green-700")
            }
          ></h4>
        </div>
        <div className="flex flex-col relative">
          <div className=" input-fields px-[25px] flex flex-row items-center justify-between">
            <input
              className="py-[1rem]  w-[100%]  bg-transparent password-field"
              type={showConfirmPassword ? "" : "password"}
              placeholder="Confirm Password"
              ref={confirmPasswordRef}
              onChange={handlePasswordCheck}
            />
            <button
              type="button"
              onClick={() => {
                setShowCofirmPassword(!showConfirmPassword);
              }}
            >
              <img className="input-icon" src={eye} alt="view-icon" />
            </button>
          </div>
          <h4
            id="confirmPassword"
            className="text-red-700 font-bold bg-transparent text-[16px] absolute mt-[3.3rem]"
          ></h4>
        </div>
        {apiMessage && <p className="api-message my-5">{apiMessage}</p>}

        <div className="flex flex-col  gap-[30px] justify-start">
          <div className="bg-transparent md:my-auto text-[16px] rounded-lg">
            <input
              type="checkbox"
              className="w-5 h-5"
              checked={isValidCaptcha}
            />
            <label className=" text-white ml-2 ">
              I am not a Robot
              <span
                className={"text-red-500 " + (isChecked ? "hidden" : "block")}
              >
                (Type Captcha First)
              </span>
            </label>
          </div>
          <div
            className={
              "flex flex-col gap-2 p-3 captcha-box justify-start w-full max-w-[15rem] " +
              (isChecked ? "hidden" : "block")
            }
          >
            <p
              className=" captcha-text font-bold text-[18px] line-through"
              onPaste={(e) => {
                e.preventDefault();
                return false;
              }}
              onCopy={(e) => {
                e.preventDefault();
                return false;
              }}
            >
              {captchaText}
            </p>
            <input
              className="p-1 captcha-field "
              type="text"
              value={userInput}
              onChange={inputChange}
              placeholder="Type Captcha here"
            />
            <button
              className="submit-button text-center p-[5px] "
              type="submit"
              onClick={checkCaptcha}
            >
              Submit
            </button>
          </div>
        </div>
        <button
          className="p-[15px] text-center continue-button "
          onClick={(e) => {
            if (isChecked) {
              handleCreateNewAccount(e);
            } else {
              SweetAlert("warning", "", "Captcha not provided!!");
            }
          }}
        >
          CONTINUE
        </button>
      </div>
    </header>
  );
};

export default SignUp;

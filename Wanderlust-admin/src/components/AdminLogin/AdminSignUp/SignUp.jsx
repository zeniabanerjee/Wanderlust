import React from "react";
import "./style.scss";
import view from "../../../assets/images/adminLogin/singinForm/view.svg";

export default function SignUp() {
  return (
    <div className=" my-auto signup-form flex flex-col items-center justify-center">
      <div className="flex flex-col w-[300px] xl:w-[360px]">
        <h2 className="text-[34px] ">Sign Up</h2>
        <form action="">
          <p className="mt-[25px] text-[14px]">Email Address</p>
          <div className="bg-white w-100 input-fields px-[23px] py-[10px] mt-[9px]">
            <input
              className="outline-none rounded-md"
              type="text"
              placeholder="Enter you email"
            />
          </div>
          <p className="mt-[10px] text-[14px]">Phone Number</p>
          <div className="bg-white w-100 input-fields px-[23px] py-[10px] mt-[9px]">
            <input
              className="outline-none rounded-md"
              type="text"
              placeholder="Enter you email"
            />
          </div>
          <p className="mt-[10px] text-[14px]">Password</p>
          <div className="bg-white input-fields px-[23px] mt-[9px] flex flex-row items-center justify-between">
            <input
              className="bg-transparent rounded-md w-[100%] py-[10px] outline-none"
              type="text"
              placeholder="Enter you password"
            />
            <button type="button">
              <img className="input-icon" src={view} alt="view-icon" />
            </button>
          </div>
          <p className="mt-[10px] text-[14px]">Confirm Password</p>
          <div className="bg-white input-fields px-[23px] mt-[9px] flex flex-row items-center justify-between">
            <input
              className="bg-transparent rounded-md w-[100%] py-[10px] outline-none"
              type="text"
              placeholder="Enter you password"
            />
            <button type="button">
              <img className="input-icon" src={view} alt="view-icon" />
            </button>
          </div>
          <button className="mt-[27px] hover:bg-[#a92323] transition-colors duration-500 py-[10px] text-center signup-button">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

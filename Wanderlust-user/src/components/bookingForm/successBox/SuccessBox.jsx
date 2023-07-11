import React from "react";
import { Link } from "react-router-dom";
import "./style.scss";
import successImg from "../../../assets/images/bookingForm/success/success.svg";

const SuccessBox = ({ setsucessModal }) => {
  return (
    <section className="success-section flex flex-col justify-center items-center">
      <div className="success-box flex flex-col justify-center items-center lg:pb-[30px] pb-[15px] px-[20px] lg:px-[50px] bg-white">
        <img
          className="lg:mt-[-60px] mt-[-50px] max-w-[50%] lg:max-w-[60%]"
          src={successImg}
          alt="success-img"
        />
        <h2 className="lg:text-[40px] text-[25px]">Success!</h2>
        <p className="lg:mt-[18px]  text-center lg:text-[18px]">
          Your booking is is <br /> successfully reserved.
        </p>
        <Link
          to="/trips"
          onClick={() => {
            setsucessModal(false);
          }}
          className="lg:mt-[50px] mt-[20px] px-[45px] py-[15px] lg:py-[15px] text-center lg:text-[18px] back-button"
        >
          BACK TO HOME
        </Link>
      </div>
    </section>
  );
};

export default SuccessBox;

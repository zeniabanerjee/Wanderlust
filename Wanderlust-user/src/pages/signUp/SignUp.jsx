import React from "react";
import "./style.scss";
import Signup from "../../components/landingPage/signUp/SignUp.jsx";
import Footer from "../../components/footer/Footer";

const Signin = () => {
  return (
    <header className="landing-page min-h-screen  sign-up-page pt-[6rem] pb-[5rem]">
      <Signup />
      <Footer />
    </header>
  );
};

export default Signin;

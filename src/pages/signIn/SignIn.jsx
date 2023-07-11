import React from "react";
import "./style.scss";
import SignIn from "../../components/landingPage/loginForm/LoginForm.jsx";
import Footer from "../../components/footer/Footer";

const Signin = () => {
  return (
    <header className="min-h-screen landing-page sign-in-page flex flex-col pt-[8rem]">
      <SignIn />
      <Footer />
    </header>
  );
};

export default Signin;

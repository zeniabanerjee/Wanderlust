import React from "react";
import Router from "../../Routes";
import "./style.scss";
import LoginBanner from "../../components/AdminLogin/LogInHeader/AdminLoginBanner.jsx";
import NavBar from "../../components/AdminLogin/Navbar/Navbar.jsx";
import NavBarLoginForm from "../../components/AdminLogin/NavBarLoginOptions/NavBarLoginOptions.jsx";
import LoginForm from "../../components/AdminLogin/LoginForm/LoginForm.jsx";
import Footer from "../../components/AdminLogin/FooterComponent/Footer.jsx";

const AdminLoginForm = () => {
  return (
    <header className="login-page flex">
      <LoginBanner />
      <div className="signin-container flex flex-col items-center bg-white">
        <NavBar />
        <div className="flex flex-col my-auto mt-[5rem] lg:mt-[8rem] justify-center items-center">
          <LoginForm />
          <NavBarLoginForm />
        </div>
        <Footer />
      </div>
    </header>
  );
};

export default AdminLoginForm;

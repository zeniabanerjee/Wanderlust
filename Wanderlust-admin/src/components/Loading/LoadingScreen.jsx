import React from "react";
import "./style.scss";
import gif from "../../assets/gif/api_loding.gif";

const LoadingScreen = () => {
  return (
    <div className="fixed top-0 left-0 w-full flex justify-center items-center loading h-[100vh]">
      <img src={gif} alt="Loding" />
    </div>
  );
};

export default LoadingScreen;

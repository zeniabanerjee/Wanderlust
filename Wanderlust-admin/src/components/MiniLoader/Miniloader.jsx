import React from "react";
import "./style.scss";

const Miniloader = () => {
  return (
    <div className=" relative w-full">
      <div className=" z-50 lds-roller absolute top-[3rem] left-[10rem]">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Miniloader;

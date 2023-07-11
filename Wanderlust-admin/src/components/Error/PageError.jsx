import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.scss";

const PageError = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <div
      className="flex justify-center items-center h-screen w-full flex-col bg-image"
    >
      <div className="flex flex-col m-10">
        <h1 className="md:text-6xl text-center mb-5">Oops!</h1>
        <p className=" text-center  text-3xl md:text-9xl text-[#E85C53;]">
          404
        </p>
        <h2 className="text-center  md:text-3xl py-3"> Page Not Found</h2>
      </div>

      <div className="justify-between flex flex-col md:flex-row md:w-[50%] ">
        <button className="bounce md:text-3xl" onClick={goBack}>
          Go Back
        </button>
        <button
          className="bounce md:text-3xl"
          onClick={() => {
            navigate("/dashboard");
          }}
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default PageError;

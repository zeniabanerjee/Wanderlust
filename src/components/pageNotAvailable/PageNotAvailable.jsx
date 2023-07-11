import React from "react";
import { Link } from "react-router-dom";
import loader from "../../assets/loaders/airplaneLoading.gif";
import Footer from "../footer/Footer";

export default function PageNotAvailable() {
  return (
    <section className="min-h-screen">
      <div className="sm:pt-[10rem] text-center flex flex-col gap-10 p-5">
        <div className="flex">
          <img src={loader} alt="loader-icon" className="block m-auto" />
        </div>
        <h1 className="text-[4rem] ">
          <span className="text-red-700">Oops </span>the Page You're Looking For
          is Not <span className="text-red-800">Available!</span>
        </h1>
        <Link
          to={"/trips"}
          className="block px-5 py-2 text-2xl border border-green-500 mx-auto my-10 cursor-pointer hover:bg-green-500 transition-colors duration-300"
        >
          Take Me Back?
        </Link>
      </div>
      <Footer />
    </section>
  );
}

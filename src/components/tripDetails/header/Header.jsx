import React from "react";
import "./style.scss";

export default function Header({ location }) {
  return (
    <>
      <header className="pt-[5rem] xl:pt-[9rem]">
        <h2 className="text-center text-[12px] xl:text-[18px] mt-[10rem] lg:mt-[15rem]">
          Know yourself in
        </h2>
        <h1 className="">{location}</h1>
      </header>
    </>
  );
}

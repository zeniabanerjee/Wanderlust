import React from "react";
import "./style.scss";

export default function footer() {
  return (
    <footer className="mt-[4rem] gap-5 lg:gap-0 flex flex-col-reverse px-[71px] pb-[20px] lg:pb-[50px] lg:flex-row justify-between  lg:items-start ">
      <div className="text-center lg:text-start mt-auto footer">
        Copyright © 2023 The Trouvaille.
      </div>
      <ul className="flex flex-wrap gap-4 lg:gap-8 justify-center mt-auto">
        <li>Terms of Use</li>
        <li>Cookie Policy</li>
        <li>Privacy Policy</li>
      </ul>
    </footer>
  );
}

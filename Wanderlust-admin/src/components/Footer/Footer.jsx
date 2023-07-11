import React from "react";
import "./style.scss";
const Footer = () => {
  return (
    <footer className=" relative flex flex-col sm:flex-row  w-full md:fixed bottom-0 px-5 py-2 md:p-5 justify-start items-start bg-[#F3F7FC]">
      <a href="dashboard" className="text-[#E75C54] sm:px-3">
        Trouvaille
      </a>
      <h5 className="sm:px-4 text-center">2021 All Rights Reserved,</h5>
      <a className="sidebar-text font-semibold" href="policy">
        Policy
      </a>
      <hr className="w-[20px]" />
      <a className="sidebar-text font-semibold" href="Tc">
        T & C
      </a>
    </footer>
  );
};

export default Footer;

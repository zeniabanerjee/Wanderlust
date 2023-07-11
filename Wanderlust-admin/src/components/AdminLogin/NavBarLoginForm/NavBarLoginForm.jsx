import React from "react";
import { Link } from "react-router-dom";
import "./style.scss";

export default function NavBarLoginForm() {
  return (
    <div className="lg:hidden flex flex-row mt-[10px] gap-[28px]">
      <p className="new-user-text text-[12px] lg:text-[14px] m-auto">
        If Already a User?
      </p>
      <Link className="signin-button py-[9px] m-auto px-[20px]" to="/">
        Sign-in
      </Link>
    </div>
  );
}

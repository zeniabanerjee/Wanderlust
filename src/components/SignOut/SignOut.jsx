import React from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateUserDetails } from "../../redux/slices/userSlice";

const SignOut = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function handleSignout() {
    Cookies.remove("TOKEN");
    localStorage.removeItem("FrontendUserData");
    dispatch(updateUserDetails());
    navigate("/");
  }
  return (
    <button className="underline font-[600] grey-text" onClick={handleSignout}>
      Signout
    </button>
  );
};

export default SignOut;

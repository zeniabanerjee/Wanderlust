import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./style.scss";
import ProfileSideBar from "../profileSideBar/ProfileSideBar";
import SignOut from "../../SignOut/SignOut";

export default function ViewAccountDetails({ setActive }) {
  const { FrontendUserData } = useSelector((state) => state.user);

  let userData;
  if (FrontendUserData?.success) {
    userData = {
      email: FrontendUserData?.data?.userDetails?.email,
      phNumber: FrontendUserData?.data?.userDetails?.phone,
      password: FrontendUserData?.data?.userDetails?.password,
    };
  }

  if (FrontendUserData?.success) {
    return (
      <header className="sm:mx-20 2xl:mx-[18.75rem] h-screen">
        <div className="flex justify-between px-10 xl:px-0 lg:text-[20px]">
          <div className="flex">
            <h2
              className="font-[600]"
              onClick={() => {
                setActive("view-account");
              }}
            >
              Settings/
            </h2>
            <span className="font-[400] grey-text"> Accounts Page</span>
          </div>
          <SignOut />
        </div>
        <div className="mt-[2rem] xl:mt-[1.5rem] flex flex-col xl:flex-row xl:justify-between gap-6 xl:gap-10 lg:text-[16px]">
          <ProfileSideBar activePage={"accounts"} setActive={setActive} />
          <div className="login-details flex flex-col lg:text-[18px] gap-[1rem] p-5 lg:p-10 2xl:p-[2.2rem] rounded-2xl xl:w-[80%] backdrop-blur-sm">
            <h2 className="font-[600]">Login Details</h2>
            <h5 className="grey-text text-[1rem] mb-[2rem]">
              Manage your email address mobile number and password
            </h5>
            <h4 className="">Mobile Number</h4>
            <input
              type="text"
              defaultValue={userData.phNumber}
              disabled={true}
            />
            <h4 className="">Email ID</h4>
            <input type="text" defaultValue={userData.email} disabled={true} />
            <h4 className="">Password</h4>
            <input
              type="password"
              defaultValue={userData?.password?.substring(0, 7)}
              disabled={true}
            />
            <button
              onClick={() => {
                setActive("edit-account");
              }}
              className="mt-[1rem] rounded-2xl text-white bg-[#219653] text-center py-4 xl:py-[1rem] xl:mx-[4rem]"
            >
              EDIT ACCOUNT DETAILS
            </button>
          </div>
        </div>
      </header>
    );
  } else {
    return (
      <div className="text-center  py-[30rem] md:py-[20rem]">
        <h1 className="text-5xl leading-[5rem]">
          <span className="text-red-700">Oops</span> Something's Wrong, <br />{" "}
          {/* With Message : {FrontendUserData.data.data.message} */}
        </h1>
        <Link
          to="/searchResult"
          className="my-10 block w-[15rem] border border-green-400 hover:text-white hover:bg-green-900 text-2xl px-5 py-2 mx-auto"
        >
          Take Me Back?
        </Link>
      </div>
    );
  }
}

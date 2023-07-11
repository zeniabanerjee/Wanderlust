import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./style.scss";
import profileImg from "../../../assets/images/accountDetails/profileSettings/profile-img.png";
import defaultProfileImg from "../../../assets/images/accountDetails/profileSettings/defaultProfileImage.png";
import editIcon from "../../../assets/images/accountDetails/profileSettings/edit.svg";
import SignOut from "../../SignOut/SignOut";
import ProfileSideBar from "../profileSideBar/ProfileSideBar";

export default function ProfileSettings({ setActive }) {
  const { updatedUserData, FrontendUserData } = useSelector(
    (state) => state.user
  );

  const profileImage = FrontendUserData?.data?.userDetails?.userDetails?.image;
  const userLocation = FrontendUserData?.data?.userDetails?.userDetails?.place;
  const userName = FrontendUserData?.data?.userDetails?.userDetails?.name;
  const userDOB = FrontendUserData?.data?.userDetails?.userDetails?.DOB;
  const userGender = FrontendUserData?.data?.userDetails?.userDetails?.gender;
  const userMaritalStatus =
    FrontendUserData?.data?.userDetails?.userDetails?.maritalStatus;
  const userJoiningYear = FrontendUserData?.data?.userDetails?.joiningYear;

  if (FrontendUserData) {
    return (
      <header className=" sm:mx-20 2xl:mx-[18.75rem]">
        <div className="flex justify-between px-10 xl:px-0 lg:text-[22px]">
          <div className="flex">
            <h2
              className="font-[600]"
              onClick={() => {
                setActive("view-account");
              }}
            >
              Settings/
            </h2>
            <span className="font-[400] grey-text"> My profile</span>
          </div>
          <SignOut />
        </div>
        <div className="flex flex-col sm:flex-row gap-[2rem] items-center xl:items-start mt-[1.5rem] sm:mt-[2rem] profile-section ">
          <div className="flex flex-col h-[180px] w-[150px] profile-img overflow-hidden">
            {profileImage && (
              <img
                className={
                  "profile-img" +
                  (FrontendUserData?.success ? " block " : " hidden ")
                }
                src={FrontendUserData?.data?.userDetails?.userDetails?.image}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src = defaultProfileImg;
                }}
                alt="profile-img"
              />
            )}
            <img
              src={defaultProfileImg}
              alt="defaultProfileImage"
              className={profileImage ? " hidden " : " block profile-img "}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = defaultProfileImg;
              }}
            />
            <h4 className="text-center grey-text grey-text underline mt-[0.8rem]">
              User Dashboard
            </h4>
          </div>
          <div className="flex flex-col items-center sm:items-start gap-[1rem]">
            <h2 className="grey-text">
              {FrontendUserData?.data?.userDetails?.email}
            </h2>
            <div className="flex gap-[1rem] items-center">
              <span className=" grey-text">
                {userLocation && userLocation !== ""
                  ? userLocation
                  : "Location"}
              </span>
              <i className="fa-solid fa-circle text-[0.8rem]"></i>
              <span className=" grey-text">
                Joined in {userJoiningYear ? userJoiningYear : "2023"}
              </span>
            </div>
            <button
              onClick={() => {
                setActive("edit-profile");
              }}
            >
              <div className="flex gap-[1.3rem] items-center">
                <img src={editIcon} alt="edit-icon" className="w-6 h-6" />
                <p className="edit-profile-link underline grey-text">
                  Edit Profile
                </p>
              </div>
            </button>
          </div>
        </div>
        <div className="xl:mt-[5rem] mt-[2rem] flex flex-col xl:flex-row xl:justify-between gap-8 xl:gap-14 lg:text-[20px]">
          <ProfileSideBar activePage={"profile"} setActive={setActive} />
          <div className="profile-details flex flex-col lg:text-[22px]  p-5 lg:p-10 2xl:p-[2.2rem] rounded-2xl xl:w-[80%] backdrop-blur-sm">
            <h2 className="font-[600]">Profile</h2>
            <h5 className="mb-[2rem] text-[1rem]">
              Basic info, for a faster booking experience
            </h5>
            <h4 className="mb-[1rem] grey-text">Name</h4>
            <input
              className="mb-[1rem] grey-text"
              defaultValue={userName ? userName : ""}
              placeholder="Your Name"
              disabled={true}
            />
            <h4 className="mb-[1rem] grey-text">Date</h4>
            <input
              className="mb-[1rem] grey-text"
              defaultValue={userDOB ? userDOB : ""}
              placeholder="Your DOB"
              disabled={true}
            />
            <h4 className="mb-[1rem] grey-text">Gender</h4>
            <input
              className="mb-[1rem] grey-text"
              defaultValue={userGender ? userGender : ""}
              placeholder="Your Gender"
              disabled={true}
            />
            <h4 className="mb-[1rem] grey-text">Marital Status</h4>
            <input
              className="mb-[1rem] grey-text"
              defaultValue={userMaritalStatus ? userMaritalStatus : ""}
              placeholder="Your Martial Status"
              disabled={true}
            />
          </div>
        </div>
      </header>
    );
  } else {
    return (
      <div className="text-center  py-[30rem] md:py-[20rem]">
        <h1 className="text-5xl leading-[5rem]">
          <span className="text-red-700">Oops</span> Something's Wrong, <br />{" "}
          With Status Code : {FrontendUserData?.status}
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

import { React, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, getUser } from "../../redux/actions/addUserAction";
import AlertComponent from "../Alerts/AlertComponent";
import store from "../../redux/store";
import { useNavigate } from "react-router-dom";

const EditUser = ({ editPop, setEditPop, data }) => {
  const { data: updatedUser, error } = useSelector((state) => state.updateUser);
  let { userDetails } = useSelector((state) => state.userLogin);
  const storeData = store.getState();
  const userType = storeData.userLogin.userDetails?.data?.userDetails?.userType;
  const [name, setName] = useState(
    data.userName || data?.data?.userDetails?.userName
  );
  const [email, setEmail] = useState(
    data.email || data?.data?.userDetails.email
  );
  const [phone, setPhone] = useState(
    data.phone || data?.data?.userDetails.phone
  );
  const [errorText, setErrorText] = useState(null);
  const navigate = useNavigate();

  const id = data._id || data?.data?.userDetails?._id;
  const dispatch = useDispatch();

  const updateHandler = () => {
    if (email && phone && name) {
      dispatch(updateUser(id, name, email, phone, "Backend-user"));
    } else {
      AlertComponent("warning", "", "Fields Can't be Empty");
    }
  };

  useEffect(() => {
    if (updatedUser?.success) {
      dispatch(getUser("Backend-user"));
      setEditPop(!editPop);

      dispatch({ type: "UPDATE_USER_SUCCESS", payload: null });
      AlertComponent("success", updatedUser);
    } else if (updatedUser?.success === false) {
      AlertComponent("failed", updatedUser);
      dispatch({ type: "UPDATE_USER_SUCCESS", payload: null });
    }
  }, [updatedUser]);

  let newUserData = { ...userDetails };
  useEffect(() => {
    if (userType === "Backend-user" && updatedUser?.success) {
      const updatedDetails = updatedUser?.data?.adminDetails;
      newUserData.data.userDetails.email = updatedDetails?.email;
      newUserData.data.userDetails.phone = updatedDetails?.phone;
      newUserData.data.userDetails.userName = updatedDetails?.userName;
      userDetails = { ...newUserData };
      localStorage.setItem("userDetails", JSON.stringify(userDetails));
      navigate("/dashboard");
    }
  }, [updatedUser]);

  useEffect(() => {
    if (error) {
      AlertComponent("error", error);
      dispatch({ type: "UPDATE_USER_FAILED", payload: null });
    }
  }, [error]);

  return (
    <div
      className={`fixed top-0 left-0 w-full flex justify-center items-center addUser  h-[100vh] ${
        !editPop && "hidden"
      }`}
    >
      <div className="flex flex-col justify-center m-auto md:w-[28%] bg-white p-4 ">
        <div className="flex justify-between py-2">
          <h2 className="text-start font-bold">Update User Details</h2>
          <button
            className=""
            onClick={() => {
              setEditPop(!editPop);
            }}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <form className="flex flex-col ">
          <label className="text-sm font-light py-2">Name</label>
          <input
            className="border-2 rounded-md p-2"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <label className="text-sm py-2 font-light">Email Address</label>
          <input
            className="border-2 rounded-md p-2"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            disabled
          />
          <label className="text-sm py-2 font-light">Phone Number</label>
          <input
            className="border-2 rounded-md p-2"
            type="number"
            value={phone}
            max={10}
            onChange={(e) => {
              let phoneVal = e.target.value;
              setPhone(phoneVal);
              if (phoneVal.length < 10) {
                setErrorText("Enter Valid Number");
              } else if (phoneVal.length === 10) {
                setErrorText("Valid Number");
              } else if (phoneVal.length > 0) {
                setErrorText("Only 10 Digit Accepted");
              }
            }}
          />
          {errorText && <h2 style={{ color: "red" }}>{errorText}</h2>}
        </form>
        <div className="flex item-center justify-center gap-6 ">
          <button
            className="bg-[#E85C53] text-white p-2 mt-5 rounded-sm"
            onClick={() => {
              setEditPop(!editPop);
            }}
          >
            Cancel
          </button>
          <button
            className="bg-[#E85C53] text-white p-2 mt-5 rounded-sm"
            onClick={updateHandler}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUser;

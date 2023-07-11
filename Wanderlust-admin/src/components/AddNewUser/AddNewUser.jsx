import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import { addNewUser, getUser } from "../../redux/actions/addUserAction";

import validator from "validator";
import LoadingScreen from "../Loading/LoadingScreen";
import AlertComponent from "../Alerts/AlertComponent";
const AddNewUser = ({ setAddPop, addPop }) => {
  const { data } = useSelector((state) => state.getUser);
  const {
    data: addedUser,
    loading,
    error,
  } = useSelector((state) => state.addNewUser);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrorText] = useState(null);
  const dispatch = useDispatch();
  const runningPort = window.location.port;

  const validateEmail = (e) => {
    setEmail(e.target.value);

    if (validator.isEmail(email)) {
      setErrorText(null);
    } else {
      setErrorText("Not a valid Email!");
    }
  };

  const addUserHandler = () => {
    if (name && email) {
      dispatch(addNewUser(name, email, "Backend-user", runningPort));
      setName("");
      setEmail("");
    } else {
      AlertComponent("warning", "", "All fields are required");
    }
  };
  useEffect(() => {
    if (addedUser?.success) {
      setAddPop(!addPop);
      dispatch(getUser("Backend-user"));
      dispatch({ type: "ADD_USER_SUCCESS", payload: null });
      AlertComponent("success", addedUser);
    } else if (addedUser?.success === false) {
      AlertComponent("failed", addedUser);
      dispatch({ type: "ADD_USER_SUCCESS", payload: null });
    }
  }, [addedUser]);

  useEffect(() => {
    if (error) {
      AlertComponent("error", error);
      setAddPop(!addPop);
      dispatch({ type: "ADD_USER_FAILED", payload: null });
    }
  }, [error]);

  return (
    <div
      className={`fixed top-0 left-0 w-full flex justify-center items-center addUser   h-[100vh] ${
        !addPop && "hidden"
      }`}
    >
      <div className="flex flex-col justify-center m-auto md:w-[28%] bg-white p-4 ">
        <div className="flex justify-between py-2">
          <h2 className="text-start font-bold">Add New User</h2>
          <button
            className=""
            onClick={() => {
              setAddPop(!addPop);
            }}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <form className="flex flex-col ">
          <label className="text-sm font-light py-2" htmlFor="Name">
            Name
          </label>
          <input
            className="border-2 rounded-md"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <label className="text-sm py-2 font-light" htmlFor="email">
            Email Address
          </label>
          <input
            className="border-2 rounded-md"
            value={email}
            type="email"
            onChange={(e) => {
              validateEmail(e);
            }}
          />
        </form>

        {errors && <h2 style={{ color: "red" }}>{errors}</h2>}

        <div className="flex item-center justify-center">
          <button
            className="bg-[#E85C53] text-white p-2 mt-5 rounded-sm"
            onClick={addUserHandler}
          >
            {loading ? <LoadingScreen /> : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNewUser;

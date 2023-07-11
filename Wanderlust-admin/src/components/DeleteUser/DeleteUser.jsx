import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { delUser, getUser } from "../../redux/actions/addUserAction";
import AlertComponent from "../Alerts/AlertComponent";

const DeleteUser = ({ delPop, setDelPop, data }) => {
  const dispatch = useDispatch();
  const { data: deletedUser, error } = useSelector((state) => state.delUser);
  const id = data._id;

  const DelHandler = () => {
    if (id) {
      dispatch(delUser(id, "Backend-user"));
    }
  };

  useEffect(() => {
    if (deletedUser?.success) {
      dispatch(getUser("Backend-user"));
      setDelPop(!delPop);
      dispatch({ type: "DELETE_USER_SUCCESS", payload: null });
      AlertComponent("success", deletedUser);
    } else if (deletedUser?.success === false) {
      AlertComponent("failed", deletedUser);
      dispatch({ type: "DELETE_USER_SUCCESS", payload: null });
    }
  }, [deletedUser]);

  useEffect(() => {
    if (error) {
      AlertComponent("error", error);
      dispatch({ type: "DELETE_USER_FAILED", payload: null });
    }
  }, [error]);

  return (
    <div
      className={`fixed top-0 left-0 w-full flex justify-center items-center addUser  h-[100vh] ${
        !delPop && "hidden"
      }`}
    >
      <div className="flex flex-col justify-center text-center m-auto md:w-[28%] bg-white p-4 ">
        <div className="flex justify-center py-2">
          <h2 className=" font-bold">Are you sure?</h2>
        </div>
        <h3>You are about to delete a user</h3>
        <div className="flex item-center justify-center p-2 gap-6">
          <button
            className="bg-[#E85C53] text-white p-2 mt-5 rounded-sm"
            onClick={() => {
              setDelPop(!delPop);
            }}
          >
            Cancel
          </button>
          <button
            className="bg-[#E85C53] text-white p-2 mt-5 rounded-sm"
            onClick={DelHandler}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUser;

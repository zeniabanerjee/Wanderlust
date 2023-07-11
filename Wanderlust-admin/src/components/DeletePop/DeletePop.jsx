import { React, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTrip, getTrip } from "../../redux/actions/tripAction";
import AlertComponent from "../Alerts/AlertComponent";

const DeletePop = ({
  showDelPop,
  setShowDelPop,
  updateData,
  heading,
  feature,
}) => {
  const { data: deletedTrip, error } = useSelector((state) => state.deleteTrip);
  const dispatch = useDispatch();
  const id = updateData._id;

  const deleteTripHandler = () => {
    if (id) {
      dispatch(deleteTrip(id, feature));
    }
  };

  useEffect(() => {
    if (deletedTrip?.success) {
      dispatch(getTrip(feature));
      setShowDelPop(!showDelPop);
      dispatch({ type: "DELETE_TRIP_SUCCESS", payload: null });
      AlertComponent("success", deletedTrip);
    } else if (deletedTrip?.success === false) {
      AlertComponent("failed", deletedTrip);
      dispatch({ type: "DELETE_TRIP_SUCCESS", payload: null });
    }
  }, [deletedTrip]);

  useEffect(() => {
    if (error) {
      AlertComponent("error", error);
      dispatch({ type: "DELETE_TRIP_FAILED", payload: null });
    }
  }, [error]);

  return (
    <div
      className={`fixed top-0 left-0 w-full flex justify-center items-center addUser  h-[100vh] ${
        !showDelPop && "hidden"
      }`}
    >
      <div className="flex flex-col justify-center text-center m-auto md:w-[28%] bg-white p-4 ">
        <div className="flex justify-center py-2">
          <h2 className=" font-bold">Are you sure?</h2>
        </div>
        <h3>You are about to delete a {heading}</h3>
        <div className="flex item-center justify-center p-2 gap-6">
          <button
            className="bg-[#E85C53] text-white p-2 mt-5 rounded-sm"
            onClick={() => {
              setShowDelPop(!showDelPop);
            }}
          >
            Cancel
          </button>
          <button
            className="bg-[#E85C53] text-white p-2 mt-5 rounded-sm"
            onClick={deleteTripHandler}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePop;

import { React, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteBookingNote,
  getBookingNote,
} from "../../redux/actions/bookingActions";
import Swal from "sweetalert2";
import AlertComponent from "../Alerts/AlertComponent";

const DeleteBookingNotePop = ({
  showBookingNoteDelPop,
  setShowBookingNoteDelPop,
  updateData,
  heading,
}) => {
  const { data: deletedNote } = useSelector((state) => state.deleteBookingNote);
  const dispatch = useDispatch();
  const id = updateData._id;

  const deleteHandler = () => {
    if (id) {
      dispatch(deleteBookingNote(id));
    }
  };

  useEffect(() => {
    if (deletedNote?.success) {
      dispatch(getBookingNote());
      setShowBookingNoteDelPop(!showBookingNoteDelPop);
      dispatch({ type: "DELETE_BOOKING_NOTE_SUCCESS", payload: null });
      AlertComponent("success", deletedNote);

    } else if (deletedNote?.success === false) {
      AlertComponent("failed", deletedNote);
      dispatch({ type: "DELETE_BOOKING_NOTE_SUCCESS", payload: null });
    }
  }, [deletedNote]);

  return (
    <div
      className={`fixed top-0 left-0 w-full flex justify-center items-center addUser  h-[100vh] ${
        !showBookingNoteDelPop && "hidden"
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
              setShowBookingNoteDelPop(!showBookingNoteDelPop);
            }}
          >
            Cancel
          </button>
          <button
            className="bg-[#E85C53] text-white p-2 mt-5 rounded-sm"
            onClick={() => {
              deleteHandler();
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteBookingNotePop;

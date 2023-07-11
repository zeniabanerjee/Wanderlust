import { React, useEffect, useRef, useState } from "react";
import delIcon from "../../assets/images/user/delete.svg";
import editIcon from "../../assets/images/user/edit-icon.svg";

const BookingNoteMenu = ({
  showBookingNoteUpdatePop,
  setShowBookingNoteUpdatePop,
  setEditData,
  updateData,
  showBookingNoteDelPop,
  setShowBookingNoteDelPop,
}) => {
  const [showBookingNoteDrop, setShowBookingNoteDrop] = useState(false);
  const bookMenuRef = useRef(null);
  const handleClickOutside = (e) => {
    if (bookMenuRef.current && !bookMenuRef.current.contains(e.target)) {
      setShowBookingNoteDrop(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, "true");
  });

  return (
    <div className="relative text-end" ref={bookMenuRef}>
      <button
        className="mr-5"
        onClick={() => {
          setShowBookingNoteDrop(!showBookingNoteDrop);
        }}
      >
        ...
      </button>

      <div
        className={` absolute  z-50 top-6 w-[7rem] right-0 p-4 bg-white rounded-lg flex shadow-[5px_10px_25px_rgba(102,101,130,0.15)] flex-col justify-between items-start ${
          !showBookingNoteDrop && "hidden"
        }`}
      >
        <button
          className="flex justify-between  w-full items-center"
          onClick={() => {
            setShowBookingNoteUpdatePop(!showBookingNoteUpdatePop);
            setEditData(updateData);
          }}
        >
          Edit
          <img className="" src={editIcon} alt="edit" />
        </button>
        <button
          className="flex justify-between items-center  w-full"
          onClick={() => {
            setShowBookingNoteDelPop(!showBookingNoteDelPop);
            setEditData(updateData);
          }}
        >
          Delete <img className="" src={delIcon} alt="delete" />
        </button>
      </div>
    </div>
  );
};

export default BookingNoteMenu;

import { React, useRef, useEffect, useState } from "react";
import delIcon from "../../assets/images/user/delete.svg";
import editIcon from "../../assets/images/user/edit-icon.svg";
import { useNavigate } from "react-router-dom";
import UpdateTripForm from "../UpdatetripForm/UpdateTripForm";
import { useDispatch } from "react-redux";

const TripDropMenu = ({
  editData,
  setEditData,
  delPop,
  setDelPop,
  deleteTripState,
  setdeleteTripState,
}) => {
  const [showPop, setShowPop] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const refTripDotMenu = useRef(null);

  const handleClickOutside = (e) => {
    if (refTripDotMenu.current && !refTripDotMenu.current.contains(e.target)) {
      setShowPop(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, "true");
  }, []);

  return (
    <div className="relative" ref={refTripDotMenu}>
      <button
        className=""
        onClick={() => {
          setShowPop(!showPop);
        }}
      >
        ...
      </button>

      <div
        className={` absolute  z-50 top-6 w-[7rem] right-0 p-4 bg-white rounded-lg flex shadow-[5px_10px_25px_rgba(102,101,130,0.15)] flex-col justify-between items-start ${
          !showPop && " hidden "
        }`}
      >
        <button
          className="flex justify-between items-center w-full"
          onClick={() => {
            navigate(`/update-module/trip-package/${editData._id}`);
          }}
        >
          Edit
          <img src={editIcon} alt="edit" />
        </button>
        <button
          className="flex justify-between items-center w-full"
          onClick={() => {
            setDelPop(!delPop);
            setEditData(editData);
          }}
        >
          Delete <img src={delIcon} alt="delete" />
        </button>
      </div>
    </div>
  );
};

export default TripDropMenu;

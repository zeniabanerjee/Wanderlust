import { React, useEffect, useState, useRef } from "react";
import delIcon from "../../assets/images/user/delete.svg";
import editIcon from "../../assets/images/user/edit-icon.svg";

const DotMenu = ({
  showUpdatePop,
  setShowUpdatePop,
  setEditData,
  updateData,
  showDelPop,
  setShowDelPop,
}) => {
  const [showTraveldrop, setShowTraveldrop] = useState(false);
const refDotMenu=useRef(null)

const handleClickOutside=(e)=>{
  if(refDotMenu.current && !refDotMenu.current.contains(e.target)){
    setShowTraveldrop(false)
  }
}

useEffect(()=>{
  document.addEventListener("click",handleClickOutside,"true")
},[])

  return (
    <div ref={refDotMenu} className="relative text-end">
      <button
        className="mr-5"
        onClick={() => {
          setShowTraveldrop(!showTraveldrop);
        }}
      >
        ...
      </button>

      <div
        className={` absolute  z-50 top-6 w-[7rem] right-0 p-4 bg-white rounded-lg flex shadow-[5px_10px_25px_rgba(102,101,130,0.15)] flex-col justify-between items-start ${
          !showTraveldrop && "hidden"
        }`}
      >
        <button
          className="flex justify-between  w-full items-center"
          onClick={() => {
            setShowUpdatePop(!showUpdatePop);
            setEditData(updateData);
          }}
        >
          Edit
          <img className="" src={editIcon} alt="edit" />
        </button>
        <button
          className="flex justify-between items-center  w-full"
          onClick={() => {
            setShowDelPop(!showDelPop);
            setEditData(updateData);
          }}
        >
          Delete <img className="" src={delIcon} alt="delete" />
        </button>
      </div>
    </div>
  );
};

export default DotMenu;

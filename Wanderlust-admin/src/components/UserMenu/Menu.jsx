import React, { useEffect, useRef, useState } from "react";
import delIcon from "../../assets/images/user/delete.svg";
import editIcon from "../../assets/images/user/edit-icon.svg";
import store from "../../redux/store";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Menu = ({ setEditPop, setEditable, data, delPop, setDelPop }) => {
  const [menu, setMenu] = useState(false);
  const location = useLocation();
  const curretPageLocation = location.pathname;
  const storeData = store.getState();
  const { userDetails } = useSelector((state) => state.userLogin);
  const userType = storeData.userLogin.userDetails.data.userDetails.userType;
  const refDotMenu = useRef(null);

  const handleClickOutside = (e) => {
    if (refDotMenu.current && !refDotMenu.current.contains(e.target)) {
      setMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, "true");
  }, []);

  return (
    <div className="relative" ref={refDotMenu}>
      <button
        className={`font-bold   `}
        onClick={() => {
          setMenu(!menu);
        }}
      >
        ...
      </button>

      <div
        className={
          ` w-[7rem] absolute top-0 left-5 bg-white rounded-lg p-3 px-5 flex shadow-[5px_10px_25px_rgba(102,101,130,0.15)] flex-col justify-center items-start z-50 ${
            !menu && "hidden"
          } ` +
          (curretPageLocation === "/dashboard"
            ? " translate-x-[-100%] translate-y-5 "
            : "")
        }
      >
        <button
          className="flex justify-between items-center w-full"
          onClick={() => {
            setEditPop((editPop) => !editPop);
            setEditable(data);
          }}
        >
          Edit
          <img className="" src={editIcon} alt="edit" />
        </button>
        {userType === "Backend-user" ? (
          <></>
        ) : (
          <button
            className="flex justify-between items-center w-full"
            onClick={() => {
              setDelPop(!delPop);
              setEditable(data);
            }}
          >
            Delete <img className="" src={delIcon} alt="delete" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Menu;

import ReplayIcon from "@mui/icons-material/Replay";
import React, { useEffect, useRef, useState } from "react";
import { Calendar } from "react-date-range";
import { format } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "./style.scss";

export default function DatePicker({ type, setDateData }) {
  const [date, setDate] = useState("dd/MM/yyyy");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const refDate = useRef(null);

  const handleOutsideClick = (e) => {
    if (refDate.current && !refDate.current.contains(e.target)) {
      setShowDatePicker(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick, true);
  }, []);

  const handleChange = (date) => {
    const dateValue = format(date, "yyyy-MM-dd");

    setDate(format(date, "dd/MM/yyyy"));
    setDateData(dateValue);
    setShowDatePicker(false);
  };

  return (
    <div
      ref={refDate}
      className="date-container flex flex-col gap-2 lg:border-l-[2px] border-black lg:pl-5"
    >
      <h4>{type}</h4>
      <div className="flex justify-between">
        <input
          className="bg-transparent"
          type="text"
          value={date}
          onClick={() => {
            setShowDatePicker(!showDatePicker);
          }}
          readOnly
        />
        <button
          onClick={() => {
            setDate("dd/MM/yyyy");
            setDateData("");
          }}
        >
          <ReplayIcon />
        </button>
      </div>
      {showDatePicker && (
        <Calendar
          className="date"
          minDate={new Date()}
          date={new Date()}
          onChange={handleChange}
        />
      )}
    </div>
  );
}

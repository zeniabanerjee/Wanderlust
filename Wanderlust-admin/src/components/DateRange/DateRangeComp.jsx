import { useEffect, useRef, useState } from "react";
import { DateRange } from "react-date-range";
import calendarIcon from "../../assets/images/trip-list/calender-icon.svg";
import format from "date-fns/format";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const DateRangeComp = ({ setDuration, duration, range, setRange }) => {
  const dateMonthFromat = duration?.split("-");
  const apiStartDate = `${dateMonthFromat[0]}`;
  const apiEndDate = `${dateMonthFromat[1]}`;

  const [open, setOpen] = useState(false);
  const refOne = useRef(null);

  useEffect(() => {
    document.addEventListener("keydown", hideOnEscape, true);
    document.addEventListener("click", hideOnClickOutside, true);
  }, []);

  const hideOnEscape = (e) => {
    if (e.key === "Escape") {
      setOpen(!open);
    }
  };

  const dateHandle = (val) => {
    setRange(val);
  };

  // change value of duration only when range.enddate
  useEffect(() => {
    setDuration(
      format(range[0].startDate, "dd/MM/yyyy") +
        " - " +
        format(range[0].endDate, "dd/MM/yyyy")
    );
  }, [range[0].endDate]);

  const hideOnClickOutside = (e) => {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false);
    }
  };

  return (
    <>
      <div className=" relative ">
        <div className="calendarWrap flex border-2 rounded-md  md:w-[60%] justify-between p-1">
          <input
            value={`${format(range[0].startDate, "dd LLLL")} - ${format(
              range[0].endDate,
              "dd LLLL"
            )}`}
            readOnly
            className="inputBox outline-0 rounded-md w-full"
            onClick={() => {
              setOpen(!open);
            }}
          />

          <img
            src={calendarIcon}
            className="w-[1.4rem] h-[1.5rem]"
            alt="calendar"
            onClick={() => {
              setOpen(!open);
            }}
          />

          <div ref={refOne} className="absolute top-full z-50">
            {open && (
              <DateRange
                onChange={(item) => dateHandle([item.selection])}
                editableDateInputs={true}
                startDatePlaceholder="pick"
                moveRangeOnFirstSelection={false}
                ranges={range}
                months={1}
                minDate={new Date()}
                direction="horizontal"
                className="calendarElement w-[80%] md:w-full "
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DateRangeComp;

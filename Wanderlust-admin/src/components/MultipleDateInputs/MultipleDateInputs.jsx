import React, { useEffect, useState } from "react";
import dateRange from "../../functions/dateRange";
import convertDate from "../../functions/monthFormat";

const MultipleDateInputs = ({
  duration,
  setArrayDate,
  arrayDate,
  editMode,
}) => {
  const date = duration.split(" ");
  const startDate = date[0];
  const endDate = date[2];
  const [counter, setCounter] = useState(0);

  const newStartdate = convertDate(startDate);
  const newEnddate = convertDate(endDate);

  useEffect(() => {
    setArrayDate([...dateRange(newStartdate, newEnddate)]);
    setCounter(1);
  }, [newStartdate, newEnddate]);

  const handleChange = (key, e) => {
    let newarr = [...arrayDate];
    arrayDate[key].details = e.target.value;
    setArrayDate(newarr);
  };

  return (
    <div className="grid grid-cols-2 gap-2">
      {Array.isArray(arrayDate) &&
        counter === 1 &&
        arrayDate?.map((input, key) => (
          <div className=" flex flex-col " key={key}>
            <label> {input?.date}</label>
            <input
              placeholder="Details"
              className=" border p-3  rounded-md"
              type="text"
              onChange={(e) => {
                handleChange(key, e);
              }}
              value={input?.details}
            />
          </div>
        ))}
    </div>
  );
};

export default MultipleDateInputs;

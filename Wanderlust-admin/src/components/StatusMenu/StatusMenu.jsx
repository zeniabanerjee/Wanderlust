import { React, useState } from "react";
import Select from "react-select";

const StatusMenu = ({ width, options, value, onChange, textPlaceholder }) => {
  return (
    <div className="">
      <Select
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            width: width,
            padding: "0.4rem",
          }),
        }}
        options={options}
        placeholder={textPlaceholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default StatusMenu;

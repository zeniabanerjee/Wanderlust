import React from "react";

const Nodata = ({ name }) => {
  return (
    <div className="flex justify-center items-center w-full h-[90vh]">
      <h2>Database is Empty!! Pls Add {name}</h2>
    </div>
  );
};

export default Nodata;

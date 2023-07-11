import { React, useState } from "react";
import AlertComponent from "../Alerts/AlertComponent";

function MultipleTripForm({
  setIndexes,
  inputFields,
  setInputFields,
  editMode,
  setEditMode,
}) {
  function imageChange(index, e) {
    const list = [...inputFields];
    if (e.target.files[0]) {
      const maxLimit = 5242880;
      if (e.target.files[0].size > maxLimit) {
        AlertComponent("warning", "", "Maximum Size is 5 MB");
      } else {
        list[index]["images"] = e.target.files[0];
        list[index]["showIcon"] = URL.createObjectURL(e.target.files[0]);
      }
    }

    setInputFields(list);

    editMode &&
      setIndexes((prev) => {
        if (prev.includes(index + 1) === false) return [...prev, index + 1];
        else return [...prev];
      });
  }

  const removeInputFields = (index) => {
    const rows = [...inputFields];
    rows.splice(index, 1);
    setInputFields(rows);

    editMode &&
      setIndexes((prev) => {
        let arr = [...prev];
        for (let i = 0; i < arr.length; i++) {
          if (arr[i] === index + 1) {
            arr.splice(i, 1);
            for (let j = i; j < arr.length; j++) {
              arr[j] = arr[j] - 1;
            }
          } else if (arr[i] >= index + 1) {
            arr[i] = arr[i] - 1;
          }
        }
        return arr;
      });
  };

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const list = [...inputFields];
    list[index][name] = value;
    setInputFields(list);
  };

  return (
    <div className="col-sm-8">
      {inputFields.map((data, index) => {
        return (
          <div className="row my-3" key={index}>
            <div className="flex items-center">
              <div className="flex justify-between w-full">
                <div className=" flex flex-col w-full">
                  <label className=" text-gray-400">Title</label>
                  <input
                    type="text"
                    className="border-2 p-2 rounded-md w-[80%]"
                    onChange={(e) => handleChange(index, e)}
                    value={data.title}
                    name="title"
                  />
                </div>
                <div className=" flex flex-col w-[80%]">
                  <label className=" text-gray-400">Name</label>
                  <input
                    type="text"
                    className="border-2 p-2 rounded-md"
                    onChange={(e) => handleChange(index, e)}
                    value={data.name}
                    name="name"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <label className=" text-gray-400">Description</label>
              <textarea
                rows="5"
                cols="33"
                type="text"
                value={data.description}
                className="border-2 rounded-md resize-none"
                onChange={(e) => handleChange(index, e)}
                name="description"
              />
            </div>
            <div className="py-4">
              <div className=" flex flex-col md:flex-row justify-start items-center space-x-2 relative">
                {editMode ? (
                  data.icon || data.showIcon ? (
                    <img
                      src={
                        data.hasOwnProperty("showIcon")
                          ? data.showIcon
                          : data.icon
                      }
                      alt="browserIcon"
                      className="w-[30%] md:w-[20%]  md:h-[10vh]"
                    />
                  ) : (
                    <h1 className="text-gray-400">Icon</h1>
                  )
                ) : data.images ? (
                  <img
                    src={editMode ? data.images : data.showIcon}
                    alt="browserIcon"
                    className="w-[30%] md:w-[20%]  md:h-[10vh]"
                  />
                ) : (
                  <h1 className="text-gray-400">Icon</h1>
                )}
                <div className="relative md:mt-0 mt-5">
                  <button className="border-2 border-red-500 px-2 rounded-md text-red-500">
                    Browse
                  </button>
                  <input
                    type="file"
                    accept=".jpg,.png,.jpeg,.svg"
                    className="absolute right-[10%] opacity-0 cursor-pointer "
                    onChange={(e) => imageChange(index, e)}
                  />
                </div>
                <p className=" w-full my-2">
                  Allowed file types: <b> png, jpg, jpeg </b>
                </p>
              </div>
            </div>
            <div className="mt-2">
              {inputFields.length !== 1 ? (
                <button
                  className="border-2 border-red-500 px-2 rounded-md text-red-500 "
                  onClick={() => {
                    removeInputFields(index);
                  }}
                >
                  Remove
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default MultipleTripForm;

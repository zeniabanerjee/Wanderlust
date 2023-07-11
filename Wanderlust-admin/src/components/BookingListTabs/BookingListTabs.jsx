import React from "react";
import "./style.scss";

const BookingListTabs = (props) => {
  const { setActiveStatusTab, activeStatusTab } = props;
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 cursor-pointer text-md  bg-[#f5f9ff] font-semibold">
      <div
        className={
          "p-3 text-center  " +
          (activeStatusTab === "All" ? "text-red-400 active-tab" : "")
        }
        onClick={() => setActiveStatusTab("All")}
      >
        All
      </div>
      <div
        className={
          "p-3 text-center " +
          (activeStatusTab === "Confirm" ? "text-red-400 active-tab" : "")
        }
        onClick={() => setActiveStatusTab("Confirm")}
      >
        Confirm
      </div>
      <div
        className={
          "p-3 text-center " +
          (activeStatusTab === "Pending" ? "text-red-400 active-tab" : "")
        }
        onClick={() => setActiveStatusTab("Pending")}
      >
        Pending
      </div>
      <div
        className={
          "p-3 text-center " +
          (activeStatusTab === "Cancelled" ? "text-red-400 active-tab" : "")
        }
        onClick={() => setActiveStatusTab("Cancelled")}
      >
        Cancelled
      </div>
      <div
        className={
          "p-3 text-center " +
          (activeStatusTab === "Completed" ? "text-red-400 active-tab" : "")
        }
        onClick={() => setActiveStatusTab("Completed")}
      >
        Completed
      </div>
    </div>
  );
};

export default BookingListTabs;

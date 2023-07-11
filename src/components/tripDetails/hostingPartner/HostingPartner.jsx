import React, { useState } from "react";
import "./style.scss";

export default function HostingPartner(props) {
  const [showMore, setShowMore] = useState(false);
  return (
    <div className="lg:w-1/2 hosting-partner">
      <h2 className="text-[#9D9DAA] text-[3rem]">
        <span className="text-[#2EC8B9]">tico</span>
        <span className="text-[#9D9DAA]">com</span>
      </h2>
      <p className="mt-[-1rem] mb-[3rem] text-[16.5px]">Hosting partner</p>
      <p className={!showMore ? "line-clamp-3" : ""}>{props.content}</p>
      <h4
        className={
          "text-[16.5px] text-[#BC4E37]" + (showMore === true ? " hidden" : "")
        }
        onClick={() => setShowMore(true)}
      >
        Show More
      </h4>
    </div>
  );
}

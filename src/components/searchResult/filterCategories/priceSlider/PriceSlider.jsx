import React from "react";
import { useState, useEffect, useRef } from "react";
import Slider from "rc-slider";
import getAllApiData from "./logic";

export default function PriceSlider({
  setFilterRequirements,
  filterRequirements,
}) {
  const [filterSliderValue, setFilterSliderValue] = useState(0);
  let allPackagesData = useRef();
  let maxPrice = useRef();
  const [max, setMax] = useState();

  const tripPrice = [];

  useEffect(() => {
    priceDataArray();
  }, []);

  const priceDataArray = async () => {
    allPackagesData = await getAllApiData().then((res) => {
      return res;
    });

    allPackagesData.forEach((element) => {
      if (element.status === "Active") {
        tripPrice.push(element.price);
      }
    });
    maxPrice = 0;

    tripPrice.forEach((element) => {
      if (element > maxPrice) {
        maxPrice = element;
      }
    });

    setMax(maxPrice);
  };

  const onChangeEventTriggered = (newValue) => {
    setFilterSliderValue(newValue);
    const filterRequirementsCopy = { ...filterRequirements };
    filterRequirementsCopy.price = filterSliderValue;
    setFilterRequirements(filterRequirementsCopy);
  };
  return (
    <div className="flex flex-col gap-5 lg:w-1/4 xl:w-full">
      <h4>Price</h4>
      <Slider
        value={filterSliderValue}
        step={1000}
        min={0}
        max={max}
        onChange={onChangeEventTriggered}
      />
      <div className="flex justify-between">
        <span>{filterSliderValue}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}

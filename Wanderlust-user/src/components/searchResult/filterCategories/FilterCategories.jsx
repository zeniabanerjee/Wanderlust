import "./style.scss";
import React, { useState, useEffect } from "react";
import PriceSlider from "./priceSlider/PriceSlider";
import FilterSubCategories from "./filterSubCategories/FilterSubCategories";
import axios from "axios";

export default function FilterCategories({
  setFilterRequirements,
  filterRequirements,
}) {
  const filterApiUrl =
    process.env.REACT_APP_API_HOST +
    "get-options/category/occasion/amenity/travel";

  const [filterResponse, setFilterResponse] = useState();
  const [ocassionData, setOcassionData] = useState();
  const [ammenityData, setAmmenityData] = useState();
  const [travelTypeData, setTravelTypeData] = useState();

  useEffect(() => {
    getFilterData();
  }, []);

  const setFilterDatas = () => {
    setOcassionData(
      filterResponse?.filter((data) => data?.purpose === "occasion")
    );
    setTravelTypeData(
      filterResponse?.filter((data) => data?.purpose === "travel")
    );
    setAmmenityData(
      filterResponse?.filter((data) => data?.purpose === "amenity")
    );
  };

  useEffect(() => {
    setFilterDatas();
  }, [filterResponse]);

  const getFilterData = async () => {
    const response = await axios.get(filterApiUrl);
    setFilterResponse(response?.data?.data);
  };

  return (
    <>
      <PriceSlider
        setFilterRequirements={setFilterRequirements}
        filterRequirements={filterRequirements}
      />
      <FilterSubCategories
        title={"occasions"}
        data={ocassionData}
        name={"Occassion"}
        setFilterRequirements={setFilterRequirements}
        filterRequirements={filterRequirements}
      />
      <FilterSubCategories
        title={"amenities"}
        data={ammenityData}
        name={"Ammenities"}
        setFilterRequirements={setFilterRequirements}
        filterRequirements={filterRequirements}
      />
      <FilterSubCategories
        title={"travelType"}
        data={travelTypeData}
        name={"Travel Type"}
        setFilterRequirements={setFilterRequirements}
        filterRequirements={filterRequirements}
      />
    </>
  );
}

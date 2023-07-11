import { useSelector, useDispatch } from "react-redux";
import { getAllType } from "../../redux/actions/tripAction";
import { useEffect, useState } from "react";

export const Status = [
  { label: "Active", value: "Active" },
  { label: "In-Active", value: "In-Active" },
];

export const GetOptions = () => {
  const { data } = useSelector((state) => state.getAllType);

  const dispatch = useDispatch();
  const [occassionOptions, setOccassionOptions] = useState([
    {
      value: "None",
      label: "None",
    },
  ]);
  const [amenitiesOptions, setAmenitiesOptions] = useState([]);

  const [tripCategoryOptions, settripCategoryOptions] = useState([
    {
      value: "None",
      label: "None",
    },
  ]);
  const [travelTypeOptions, setTravelTypeOptions] = useState([
    {
      value: "None",
      label: "None",
    },
  ]);

  useEffect(() => {
    dispatch(getAllType("occasion", "travel", "category", "amenity"));
  }, []);

  useEffect(() => {
    setOccassionOptions(
      data &&
        data?.data
          ?.filter((item) => item.purpose === "occasion")
          .map((item) => {
            return { label: item.title, value: item.title };
          })
    );
    setTravelTypeOptions(
      data &&
        data?.data
          ?.filter((item) => item.purpose === "travel")
          .map((item) => {
            return { label: item.title, value: item.title };
          })
    );
    settripCategoryOptions(
      data &&
        data?.data
          ?.filter((item) => item.purpose === "category")
          .map((item) => {
            return { label: item.title, value: item.title };
          })
    );
    setAmenitiesOptions(
      data &&
        data?.data
          ?.filter((item) => item.purpose === "amenity")
          .map((item) => {
            return item.title;
          })
    );
  }, [data]);

  return {
    occassionOptions,
    tripCategoryOptions,
    travelTypeOptions,
    amenitiesOptions,
  };
};

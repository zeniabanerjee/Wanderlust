import axios from "axios";
import {
  getAllPackages,
  getPackagesById,
} from "../../redux/slices/tripPackageSlice";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const GetApiDatas = async (
  setTripDetails,
  setAmmenityImgData,
  setOcassionImgData,
  setUserDatabaseData,
  currentUserId,
  currentTripId
) => {
  const { tripPackage } = useSelector((state) => state.tripPackage);
  const getAmmenityDataUrl = `${process.env.REACT_APP_API_HOST}get-feature/amenity`;
  const getOcassionDataUrl = `${process.env.REACT_APP_API_HOST}get-feature/occasion`;
  const getUserDatabaseUrl = `${process.env.REACT_APP_API_HOST}database/Frontend-user`;

  const getAmmenityData = await axios.get(getAmmenityDataUrl);
  const getOcassionData = await axios.get(getOcassionDataUrl);
  const getUserDatabase = await axios.get(
    `${getUserDatabaseUrl}/${currentUserId}`
  );

  setAmmenityImgData(getAmmenityData);
  setOcassionImgData(getOcassionData);
  setUserDatabaseData(getUserDatabase);
  return {};
};

export default GetApiDatas;

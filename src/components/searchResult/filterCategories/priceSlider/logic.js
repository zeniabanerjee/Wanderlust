import axios from "axios";

const allTripPackagesApi = `${process.env.REACT_APP_API_HOST}get-module/trip-package`;

const getAllApiData = async () => {
  const getAllTripPackagesData = await axios.get(allTripPackagesApi);
  return getAllTripPackagesData.data.data;
};

export default getAllApiData;

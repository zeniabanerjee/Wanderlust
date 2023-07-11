import axios from "axios";

const getAllApiData = async (userId, setUserBookingDetails) => {
  const allUserBookingApi = `${process.env.REACT_APP_API_HOST}user-all-booking/${userId}`;
  const getAllTripPackagesData = await axios.get(allUserBookingApi);
  setUserBookingDetails(getAllTripPackagesData);
};

export default getAllApiData;

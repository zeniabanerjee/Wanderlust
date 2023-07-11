import axios from "axios";

const getAllApiData = async (
  bookingId,
  userId,
  setUserBookingDetails,
  setSuccess
) => {
  const userBookingApi = `${process.env.REACT_APP_API_HOST}user-booking/${userId}/${bookingId}`;
  const getAllTripPackagesData = await axios.get(userBookingApi);
  setSuccess(getAllTripPackagesData.data.success);
  setUserBookingDetails(getAllTripPackagesData.data.data);
};

export default getAllApiData;

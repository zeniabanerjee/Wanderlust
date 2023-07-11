import { React, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import getAllApiData from "./logic";
import TripNames from "./tripNames/TripNames";
import { getAllUserBooking } from "../../../redux/slices/bookingSlice";
import LoadingScreen from "../../loading/loadingScreen";
export default function TripList() {
  const { FrontendUserData } = useSelector((state) => state.user);
  const userId = FrontendUserData?.data?.userDetails?._id;
  const [userBookingDetails, setUserBookingDetails] = useState();
  const { bookingData, loading } = useSelector((state) => state.booking);

  const dispatch = useDispatch();

  if (userBookingDetails?.data?.success) {
  }
  useEffect(() => {
    dispatch(getAllUserBooking(userId));
  }, []);

  useEffect(() => {
    if (bookingData) {
      setUserBookingDetails(bookingData);
    }
  }, [bookingData]);

  return (
    <>
      {loading && <LoadingScreen />}
      <section className="flex flex-col trip-list-container items-center min-h-screen">
        <h2 className="md:text-[40px] text-center my-[10px] lg:my-[30px] text-[30px]">
          Trip List
        </h2>
        {userBookingDetails ? (
          <div className="bookings-table-container overflow-x-scroll w-[90%] md:max-w-fit">
            <table className="text-center trip-list pt-[20px]">
              <tbody>
                <tr className="text-[#E0DBD9]">
                  <th>Trip Title</th>
                  <th>Duration</th>
                  <th>No. Of Passenger</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
                {userBookingDetails &&
                  userBookingDetails?.data.map((data, index) => {
                    return (
                      <TripNames
                        key={index}
                        title={data.title}
                        duration={data.tripDetails.duration}
                        passengers={data.otherPassenger.length}
                        price={data.tripDetails.price}
                        status={data.bookingStatus}
                        bookingId={data._id}
                        userId={userId}
                      />
                    );
                  })}
              </tbody>
            </table>
          </div>
        ) : (
          <h2 className="text-[2rem] ">No Bookings Found</h2>
        )}
      </section>
    </>
  );
}

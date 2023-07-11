import axios from "axios";
import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getBooking,
  getBookingByStatus,
} from "../../redux/actions/bookingActions";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import InfoIcon from "@mui/icons-material/Info";
import Pagination from "../Pagination/Pagination";
import Nodata from "../Nodata/Nodata";
import defautNotFoundImage from "../../assets/images/booking/defaultImage.jpg";
import { statusColor } from "../../functions/statusColor";

let PageSize = 4;

const BookingItems = (props) => {
  const { data } = useSelector((state) => state.getBooking);
  const { data: booking } = useSelector((state) => state.getBookingByStatus);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [dataMap, setDataMap] = useState();

  useEffect(() => {
    if (props.activeStatusTab === "All") {
      dispatch(getBooking());
      dispatch({
        type: "GET_BOOKING_BY_STATUS_SUCCESS",
        payload: null,
      });
    } else {
      dispatch(getBookingByStatus(props.activeStatusTab));
      setCurrentPage(1);
      dispatch({
        type: "GET_BOOKING_SUCCESS",
        payload: null,
      });
    }
  }, [props.activeStatusTab]);

  useEffect(() => {
    setDataMap(data);
  }, [data]);

  useEffect(() => {
    setDataMap(booking);
  }, [booking]);

  const firstPageIndex = currentPage > 0 ? (currentPage - 1) * PageSize : 0;
  const lastPageIndex = firstPageIndex + PageSize;

  useEffect(() => {
    if (
      dataMap &&
      dataMap?.data.slice(firstPageIndex, lastPageIndex).length === 0
    ) {
      setCurrentPage((prev) => (prev > 1 ? prev - 1 : 1));
    }
  }, [data]);

  return (
    <>
      <div className="flex flex-col justify-between">
        <div>
          {dataMap && (dataMap.data.length !== 0 || dataMap.data === null) ? (
            <div>
              {dataMap &&
                dataMap?.data
                  .toReversed()
                  .slice(firstPageIndex, lastPageIndex)
                  .map((items, index) => {
                    return (
                      <>
                        <div
                          key={index}
                          className={
                            "mb-4 p-5 md:p-0 md:my-0 flex flex-col md:grid  md:grid-cols-6 w-full md:gap-3 text-start gap-5" +
                            (index % 2 == 0 ? " bg-[#F5F9FF]" : "")
                          }
                        >
                          <div className="p-2 md:py-4  flex flex-col md:flex-row  md:gap-3 items-center">
                            <img
                              className="md:w-[62px] min-w-[62px] max-h-[250px] max-w-[350px] md:h-[62px] object-fill w-[90%] h-80 rounded-md my-4 md:my-0"
                              src={items.tripDetails?.image}
                              alt="Package-Icon"
                              onError={({ currentTarget }) => {
                                currentTarget.onerror = null;
                                currentTarget.src = defautNotFoundImage;
                              }}
                            />
                            <span className="font-semibold truncate text-start text-ellipsis overflow-hidden">
                              {items?.title}
                            </span>
                          </div>
                          <div className="flex items-center justify-between md:p-3">
                            <span className="md:hidden">
                              <PersonIcon />
                            </span>
                            <p className="md:py-5 truncate">{items?.name}</p>
                          </div>

                          <div className="flex items-center justify-between md:p-3">
                            <span className="md:hidden">
                              <EmailIcon />
                            </span>
                            <p className="md:py-5 truncate text-ellipsis overflow-hidden">
                              {items?.email}
                            </p>
                          </div>
                          <div className="flex items-center justify-between md:p-3">
                            <span className="md:hidden">
                              <PhoneIcon />
                            </span>
                            <p className="md:py-5">{items?.phone}</p>
                          </div>

                          <div className="flex items-center justify-between md:p-3">
                            <span className="md:hidden">
                              <InfoIcon />
                            </span>

                            <p
                              className={
                                `md:py-5  flex font-semibold items-center gap-1  ` +
                                `text-${statusColor(items?.bookingStatus)}-400`
                              }
                            >
                              <span
                                className={
                                  `w-[1rem] h-[1rem]  rounded-full ` +
                                  `bg-${statusColor(items?.bookingStatus)}-400`
                                }
                              ></span>
                              <span>{items.bookingStatus}</span>
                            </p>
                          </div>

                          <div className="md:py-5 flex md:items-center justify-center">
                            <Link
                              className="border border-black px-3 py-1 rounded-md font-semibold "
                              to={"/booking-list/booking-details/" + items._id}
                            >
                              View
                            </Link>
                          </div>
                        </div>
                      </>
                    );
                  })}
            </div>
          ) : (
            <Nodata name="Bookings" />
          )}
        </div>
        <div className="md:absolute md:bottom-16">
          {dataMap && (
            <Pagination
              className="pagination-bar flex justify-end"
              currentPage={currentPage}
              totalCount={dataMap && dataMap?.data.length}
              pageSize={PageSize}
              onPageChange={(page) => setCurrentPage(page)}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default BookingItems;

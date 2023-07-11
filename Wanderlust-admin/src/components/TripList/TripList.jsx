import { React, useEffect, useState, useMemo } from "react";
import AlertComponent from "../Alerts/AlertComponent";
import TripDropMenu from "../TripDropMenu/TripDropMenu";
import { useNavigate } from "react-router-dom";
import DeleteTripPop from "../DeleteTripPop/DeleteTripPop";
import Pagination from "../Pagination/Pagination";
import {
  getPackage,
  deletePackage,
} from "../../redux/actions/addPackageActions";
import { useDispatch, useSelector } from "react-redux";
import LoadingScreen from "../Loading/LoadingScreen";
import ScheduleIcon from "@mui/icons-material/Schedule";
import DiscountIcon from "@mui/icons-material/Discount";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import Nodata from "../Nodata/Nodata";

const TripList = () => {
  let PageSize = 5;
  const [editData, setEditData] = useState("");
  const [delPop, setDelPop] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const { data, loading } = useSelector((state) => state.getPackage);
  const { data: deletedPackage, error } = useSelector(
    (state) => state.deletePackage
  );
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deletePackage(id));
  };
  useEffect(() => {
    if (deletedPackage?.success) {
      setDelPop(false);
      dispatch({ type: "DELETE_PACKAGE_SUCCESS", payload: null });
      AlertComponent("success", deletedPackage);
      setCurrentPage(1);
    } else if (deletedPackage?.success === false) {
      AlertComponent("failed", deletedPackage);
      dispatch({ type: "DELETE_PACKAGE_SUCCESS", payload: null });
    }
  }, [deletedPackage]);

  useEffect(() => {
    dispatch(getPackage());
  }, []);

  const firstPageIndex = currentPage > 0 ? (currentPage - 1) * PageSize : 0;
  const lastPageIndex = firstPageIndex + PageSize;

  useEffect(() => {
    if (deletedPackage?.success) {
      dispatch(getPackage());
    }
  }, [deletedPackage]);

  useEffect(() => {
    if (
      data &&
      data.data &&
      data.data.slice(firstPageIndex, lastPageIndex).length === 0
    ) {
      setCurrentPage((prev) => (prev > 1 ? prev - 1 : 1));
    }
  }, [data]);

  return (
    <>
      {loading && <LoadingScreen />}
      <div className="">
        <div className="p-2 bg-white item-center w-full border-b-2">
          <div className="w-full">
            <div className="tr-class md:grid md:grid-cols-5 text-[#8383A9] text-center">
              <p className="pr-3 my-auto  hidden md:block text-start ml-10">
                Trip Title
              </p>
              <p className="p-3 hidden md:block">Duration</p>
              <p className="p-3 hidden md:block"> Price</p>
              <p className="p-3 hidden md:block">Discounted Price</p>
              <div className="flex items-center w-full justify-center">
                <button
                  className="text-[#E75C54]"
                  onClick={() => {
                    navigate("/trip-list/add-trip");
                  }}
                >
                  <span>Add New Trip</span>
                  <i className=" ms-2 red-dot fa-solid fa-circle-plus"></i>
                </button>
              </div>
            </div>
            <div className="flex flex-col justify-between">
              <div>
                {data && data.data.length !== 0 ? (
                  <div className="w-full flex flex-col">
                    {data &&
                      data?.data
                        .toReversed()
                        .slice(firstPageIndex, lastPageIndex)
                        .map((val, index) => {
                          return (
                            <div
                              className={
                                "relative tr-class my-5 md:my-0 flex flex-col md:grid items-center justify-start md:grid-cols-5 w-full gap-3 md:gap-1 border-[2px] py-2 lg:py-5 md:border-0 text-start px-5" +
                                (index % 2 == 0 ? " bg-[#F5F9FF]" : "")
                              }
                              key={index}
                            >
                              <div className="td-class font-bold items-center p-1 md:m-auto  flex flex-col  md:flex-row gap-4 md:gap-2 w-full">
                                <img
                                  className="  min-w-[62px] min-h-[250px] md:min-h-[62px] w-full max-w-[350px] max-h-[250px] md:h-[62px] md:w-[62px] rounded-md"
                                  src={val.image}
                                  alt="logo"
                                />
                                <p className="my-auto text-center w-full truncate p-3  md:text-start">
                                  {val.title}
                                </p>
                              </div>
                              <div className="td-class w-80 flex justify-center md:w-full md:justify-center md:order-1 order-3 sm:order-2 my-auto">
                                <div className="md:hidden">
                                  <ScheduleIcon />
                                </div>
                                <p>{val.duration}</p>
                              </div>
                              <div className="td-class flex justify-center w-80 md:w-full  md:order-2 order-3 my-auto">
                                <div className="md:hidden">
                                  <CurrencyRupeeIcon />
                                </div>
                                <p> ₹ {val.price}</p>
                              </div>
                              <div className="td-class flex justify-center w-80 md:w-full md:order-3 order-4 my-auto">
                                <div className="md:hidden">
                                  <DiscountIcon />
                                </div>
                                ₹ {val.discountedPrice}
                              </div>
                              <div className="td-class  md:order-4 order-2 sm:order-1 md:w-full top-72  right-5 absolute md:static md:flex justify-center sm:top-5 sm:right-5 ml-auto rounded-full border-[2px] border-grey md:border-none pb-2 px-2 my-auto">
                                <TripDropMenu
                                  editData={val}
                                  setEditData={setEditData}
                                  delPop={delPop}
                                  setDelPop={setDelPop}
                                />
                              </div>
                            </div>
                          );
                        })}
                  </div>
                ) : (
                  <Nodata name="Trips" />
                )}
              </div>
              <div className="md:absolute md:bottom-16">
                {data && (
                  <Pagination
                    className="pagination-bar justify-end"
                    currentPage={currentPage}
                    totalCount={data && data?.data.length}
                    pageSize={PageSize}
                    onPageChange={(page) => setCurrentPage(page)}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        {delPop && (
          <DeleteTripPop
            delPop={delPop}
            setDelPop={setDelPop}
            handleDelete={handleDelete}
            editData={editData}
          />
        )}
      </div>
    </>
  );
};

export default TripList;

import { React, useEffect, useState } from "react";
import amenitiesBrowserIcon from "../../assets/images/amenities/browse-anenities-icon.svg";
import DotMenu from "../DotMenu/DotMenu";
import UpdatePop from "../UpdatePop/UpdatePop";
import AddNewPop from "../AddNewPop/AddNewPop";
import DeletePop from "../DeletePop/DeletePop";
import { useDispatch, useSelector } from "react-redux";
import { getTrip } from "../../redux/actions/tripAction";
import LoadingScreen from "../Loading/LoadingScreen";
import Pagination from "../Pagination/Pagination";
import "./style.scss";
import Nodata from "../Nodata/Nodata";

let PageSize = 4;

const AmenitiesTable = () => {
  const [showAdd, setShowAdd] = useState(false);
  const [showDelPop, setShowDelPop] = useState(false);
  const [showUpdatePop, setShowUpdatePop] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [editData, setEditData] = useState("");
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.getTrip);

  const firstPageIndex = currentPage > 0 ? (currentPage - 1) * PageSize : 0;
  const lastPageIndex = firstPageIndex + PageSize;
  useEffect(() => {
    dispatch(getTrip("amenity"));
  }, []);

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
      <div className="p-3 ">
        <div className="p-4 bg-white item-center w-full border-b-2">
          <div className="w-[100%]">
            <div>
              <div className="tr-class md:grid md:grid-cols-3 flex text-[#8383A9] items-center text-center justify-center">
                <div className="p-3 hidden md:block mr-auto">Amenity Title</div>
                <div className="p-3 hidden md:block mr-auto">Description</div>
                <div>
                  <button
                    className="text-[#E75C54]"
                    onClick={() => {
                      setShowAdd(!showAdd);
                    }}
                  >
                    Add New Amenities
                    <i className=" ms-2 red-dot fa-solid fa-circle-plus"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-between">
              <div>
                {data && data.data.length !== 0 ? (
                  <div>
                    {data &&
                      data?.data &&
                      data?.data
                        .toReversed()
                        .slice(firstPageIndex, lastPageIndex)
                        .map((item, index) => {
                          return (
                            <div
                              className={
                                " tr-class flex flex-col md:grid md:grid-cols-3 text-start border-[2px] px-5 md:h-[7rem] md:border-none p-6 mb-6 md:mb-0" +
                                (index % 2 == 0 ? " bg-[#F5F9FF]" : "")
                              }
                              key={index}
                            >
                              <div className="td-class font-bold w-100 flex flex-col md:flex-row md:columns-2 md:gap-3 items-center m-3 order-2 md:order-1">
                                <img
                                  src={item.icon}
                                  alt=""
                                  className="h-[3.875rem] min-w-[3.875rem] img-filter w-[62px] mr-3"
                                />
                                <p className=" w-full text-center md:text-start truncate">
                                  {item.title}
                                </p>
                              </div>
                              <p className="td-class hover:overflow-scroll line-clamp-3 order-3 md:order-2 text-center md:text-start justify-center my-auto md:items-center w-100">
                                {item.description}
                              </p>
                              <div className="text-center order-1 md:order-3 flex items-center justify-end md:justify-center">
                                <DotMenu
                                  updateData={item}
                                  showDelPop={showDelPop}
                                  setShowDelPop={setShowDelPop}
                                  showUpdatePop={showUpdatePop}
                                  setShowUpdatePop={setShowUpdatePop}
                                  setEditData={setEditData}
                                />
                              </div>
                            </div>
                          );
                        })}
                  </div>
                ) : (
                  <Nodata name="amenities" />
                )}
              </div>
              <div className="md:absolute md:bottom-16">
                {data && (
                  <Pagination
                    className="pagination-bar flex justify-end"
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
      </div>
      {showAdd && (
        <AddNewPop
          showAdd={showAdd}
          setShowAdd={setShowAdd}
          heading=" New Amenities"
          icon={amenitiesBrowserIcon}
          titleHeading="Amenity "
          feature="amenity"
        />
      )}
      {showUpdatePop && (
        <UpdatePop
          showUpdatePop={showUpdatePop}
          setShowUpdatePop={setShowUpdatePop}
          updateData={editData}
          heading="Amenities"
          titleHeading="Amenity"
          feature="amenity"
        />
      )}

      {showDelPop && (
        <DeletePop
          showDelPop={setShowDelPop}
          setShowDelPop={setShowDelPop}
          heading="amenity"
          updateData={editData}
          feature="amenity"
        />
      )}
    </>
  );
};

export default AmenitiesTable;

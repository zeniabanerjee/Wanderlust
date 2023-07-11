import { React, useState, useEffect } from "react";
import travelData from "./travelDB";
import browserIcon from "../../assets/images/travel-type/independent-icon.svg";
import AddNewPop from "../AddNewPop/AddNewPop";
import UpdatePop from "../UpdatePop/UpdatePop";
import DeletePop from "../DeletePop/DeletePop";
import DotMenu from "../DotMenu/DotMenu";
import { useDispatch, useSelector } from "react-redux";
import { getTrip } from "../../redux/actions/tripAction";
import LoadingScreen from "../Loading/LoadingScreen";
import Pagination from "../Pagination/Pagination";
import Nodata from "../Nodata/Nodata";

let PageSize = 8;

const TravelType = () => {
  const [showAdd, setShowAdd] = useState(false);
  const [showUpdatePop, setShowUpdatePop] = useState(false);
  const [showDelPop, setShowDelPop] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [editData, setEditData] = useState("");
  const dispatch = useDispatch();

  const { data, loading } = useSelector((state) => state.getTrip);

  const firstPageIndex = currentPage > 0 ? (currentPage - 1) * PageSize : 0;
  const lastPageIndex = firstPageIndex + PageSize;

  useEffect(() => {
    dispatch(getTrip("travel"));
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
      <div className="w-full p-5">
        <div className="flex justify-end">
          <button
            className="text-[#E75C54] font-bold"
            onClick={() => {
              setShowAdd(!showAdd);
            }}
          >
            Add Travel Type
            <i className=" ms-2 red-dot fa-solid fa-circle-plus"></i>
          </button>
        </div>

        <div>
          <div className="flex flex-col justify-between">
            {data && data.data.length !== 0 ? (
              <div className="grid md:grid-cols-4 sm:grid-cols-2">
                {data &&
                  data?.data &&
                  data.data
                    .toReversed()
                    .slice(firstPageIndex, lastPageIndex)
                    .map((item, index) => {
                      const icon = item.icon;

                      return (
                        <div className="w-full px-5 py-2 gap-2" key={index}>
                          <div className="p-4 bg-white h-[100%]  min-h-[15rem] text-center rounded shadow-md">
                            <div className="flex justify-end">
                              <div>
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
                            <div className="flex justify-center py-2">
                              <img src={icon} alt="" className="h-10" />
                            </div>
                            <h3 className="text-center w-full truncate font-semibold py-2">
                              {item.title}
                            </h3>
                            <p className="text-gray-600 w-full hover:overflow-scroll line-clamp-4 ">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
              </div>
            ) : (
              <Nodata name="Travel Type" />
            )}
          </div>
          <div className="md:absolute md:bottom-16 ">
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
      {showAdd && (
        <AddNewPop
          showAdd={showAdd}
          setShowAdd={setShowAdd}
          heading="Travel Type"
          icon={browserIcon}
          feature="travel"
          titleHeading="Travel Type"
        />
      )}
      {showUpdatePop && (
        <UpdatePop
          showUpdatePop={showUpdatePop}
          setShowUpdatePop={setShowUpdatePop}
          updateData={editData}
          heading="Travel Type"
          icon={browserIcon}
          titleHeading="Travel Type"
          feature="travel"
        />
      )}

      {showDelPop && (
        <DeletePop
          showDelPop={setShowDelPop}
          setShowDelPop={setShowDelPop}
          heading="Travel Type"
          feature="travel"
          updateData={editData}
        />
      )}
    </>
  );
};

export default TravelType;

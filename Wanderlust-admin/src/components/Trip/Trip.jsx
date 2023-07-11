import { React, useState, useEffect } from "react";
import browseTripIcon from "../../assets/images/trip/browse-trip-icon.svg";
import DotMenu from "../DotMenu/DotMenu";
import AddNewPop from "../AddNewPop/AddNewPop";
import UpdatePop from "../UpdatePop/UpdatePop";
import DeletePop from "../DeletePop/DeletePop";
import { useDispatch, useSelector } from "react-redux";
import { getTrip } from "../../redux/actions/tripAction";
import LoadingScreen from "../Loading/LoadingScreen";
import Pagination from "../Pagination/Pagination";
import "./style.scss";
import Nodata from "../Nodata/Nodata";

let PageSize = 8;

const Trip = () => {
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
    dispatch(getTrip("category"));
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
            Add Category
            <i className=" ms-2 red-dot fa-solid fa-circle-plus"></i>
          </button>
        </div>
        <div className=" flex flex-col justify-between">
          <div>
            {data && data.data.length !== 0 ? (
              <div className="grid sm:grid-cols-2 md:grid-cols-4">
                {data &&
                  data?.data &&
                  data.data
                    .toReversed()
                    .slice(firstPageIndex, lastPageIndex)
                    .map((val, index) => {
                      return (
                        <div className="px-5 py-2 gap-2" key={index}>
                          <div className="px-4 py-3 flex flex-col gap-5 bg-white h-full min-h-[15rem] text-center rounded shadow-md">
                            <div className="flex justify-end">
                              <div>
                                <DotMenu
                                  updateData={val}
                                  showDelPop={showDelPop}
                                  setShowDelPop={setShowDelPop}
                                  showUpdatePop={showUpdatePop}
                                  setShowUpdatePop={setShowUpdatePop}
                                  setEditData={setEditData}
                                />
                              </div>
                            </div>
                            <div className="flex justify-center">
                              <img
                                src={val.icon}
                                alt=""
                                className="h-10 img-filter"
                              />
                            </div>
                            <h3 className="text-center w-full truncate  font-semibold">
                              {val.title}
                            </h3>
                            <p className="text-gray-600 w-full  break-all line-clamp-4 hover:overflow-scroll">
                              {val.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
              </div>
            ) : (
              <Nodata name="category" />
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
          heading=" New Trip Categories"
          feature="category"
          icon={browseTripIcon}
          titleHeading="Trip "
        />
      )}
      {showUpdatePop && (
        <UpdatePop
          showUpdatePop={showUpdatePop}
          setShowUpdatePop={setShowUpdatePop}
          updateData={editData}
          feature="category"
          heading="Trip Categories"
          titleHeading="Trip"
        />
      )}

      {showDelPop && (
        <DeletePop
          showDelPop={setShowDelPop}
          setShowDelPop={setShowDelPop}
          heading="Trip Categories"
          updateData={editData}
          feature="category"
        />
      )}
    </>
  );
};

export default Trip;

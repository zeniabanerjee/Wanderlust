import { React, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBookingNote } from "../../redux/actions/bookingActions";
import LoadingScreen from "../Loading/LoadingScreen";
import Pagination from "../Pagination/Pagination";
import Nodata from "../Nodata/Nodata";
import AddBookingNotePop from "../AddBookingNotePop/AddBookingNotePop";
import UpdateBookingPop from "../UpdateBookingPop/UpdateBookingPop";
import DeleteBookingNotePop from "../DeleteBookingNotePop/DeleteBookingNotePop";
import BookingNoteMenu from "../BookingNoteMenu/BookingNoteMenu";

let PageSize = 8;

const BookingNote = () => {
  const [showNote, setShowNote] = useState(false);
  const [showBookingNoteUpdatePop, setShowBookingNoteUpdatePop] =
    useState(false);
  const [showBookingNoteDelPop, setShowBookingNoteDelPop] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [editData, setEditData] = useState("");
  const dispatch = useDispatch();

  const { data, loading } = useSelector((state) => state.getBookingNote);

  const firstPageIndex = currentPage > 0 ? (currentPage - 1) * PageSize : 0;
  const lastPageIndex = firstPageIndex + PageSize;

  useEffect(() => {
    dispatch(getBookingNote());
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
              setShowNote(!showNote);
            }}
          >
            Add Booking Note
            <i className=" ms-2 red-dot fa-solid fa-circle-plus"></i>
          </button>
        </div>
        <div className="flex flex-col justify-between">
          <div>
            {data && data.data.length !== 0 ? (
              <div className="grid lg:grid-cols-4 sm:grid-cols-2">
                {data &&
                  data?.data &&
                  data.data
                    .toReversed()
                    .slice(firstPageIndex, lastPageIndex)
                    .map((item, index) => {
                      return (
                        <div className="w-full p-5 gap-4" key={index}>
                          <div className="p-4 bg-white h-[10rem] text-center rounded shadow-md">
                            <div className="flex justify-end">
                              <div>
                                <BookingNoteMenu
                                  updateData={item}
                                  showBookingNoteDelPop={showBookingNoteDelPop}
                                  setShowBookingNoteDelPop={
                                    setShowBookingNoteDelPop
                                  }
                                  showBookingNoteUpdatePop={
                                    showBookingNoteUpdatePop
                                  }
                                  setShowBookingNoteUpdatePop={
                                    setShowBookingNoteUpdatePop
                                  }
                                  setEditData={setEditData}
                                />
                              </div>
                            </div>
                            <p className="text-gray-600 hover:overflow-scroll w-full line-clamp-4 ">
                              {item.note}
                            </p>
                          </div>
                        </div>
                      );
                    })}
              </div>
            ) : (
              <Nodata name="Booking Note" />
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
      {showNote && (
        <AddBookingNotePop
          showNote={showNote}
          setShowNote={setShowNote}
          heading="Booking Note"
        />
      )}
      {showBookingNoteUpdatePop && (
        <UpdateBookingPop
          showBookingNoteUpdatePop={showBookingNoteUpdatePop}
          setShowBookingNoteUpdatePop={setShowBookingNoteUpdatePop}
          updateData={editData}
          heading="Booking Note"
        />
      )}

      {showBookingNoteDelPop && (
        <DeleteBookingNotePop
          showBookingNoteDelPop={setShowBookingNoteDelPop}
          setShowBookingNoteDelPop={setShowBookingNoteDelPop}
          heading="Booking Note"
          updateData={editData}
        />
      )}
    </>
  );
};

export default BookingNote;

import { react, useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useSelector } from "react-redux";
import BookingItems from "../../components/BookingItem/BookingItems";
import LoadingScreen from "../../components/Loading/LoadingScreen";
import BookingListTabs from "../../components/BookingListTabs/BookingListTabs";
import { useNavigate } from "react-router-dom";

const BookingList = () => {
  const { loading } = useSelector((state) => state.getBooking);
  const [activeStatusTab, setActiveStatusTab] = useState("All");
  const { userDetails } = useSelector((state) => state.userLogin);
  const navigate = useNavigate();
  useEffect(() => {
    if (userDetails === null) navigate("/");
  });

  return (
    <>
      {loading && <LoadingScreen />}
      <div className="flex h-screen">
        <Sidebar />
        <div className="w-full h-screen overflow-auto bg-[#f5f9ff] md:pb-16">
          <Navbar heading="Booking List" />
          <div className="flex flex-col h-screen md:h-auto justify-between">
            <BookingListTabs
              activeStatusTab={activeStatusTab}
              setActiveStatusTab={setActiveStatusTab}
            />
            <div className="bg-white  overflow-auto px-2 w-full ">
              <div className="hidden md:grid grid-cols-6 gap-3 text-[#8383A9] text-center">
                <span className="py-5 ">Trip Title</span>
                <span className="py-5 ">Passenger Name</span>
                <span className="py-5">Email</span>
                <span className="py-5">Phone number</span>
                <span className="py-5">Status</span>
                <span className="py-5 text-[#E85C53]">Action</span>
              </div>
              <div>
                <BookingItems
                  activeStatusTab={activeStatusTab}
                  setActiveStatusTab={setActiveStatusTab}
                />
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingList;

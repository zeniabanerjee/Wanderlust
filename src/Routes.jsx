import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signin from "./pages/signIn/SignIn.jsx";
import SetPassword from "./pages/setPassword/SetPassword.jsx";
import ResetPassword from "./pages/resetPassword/ResetPassword.jsx";
import Signup from "./pages/signUp/SignUp.jsx";
import SearchResult from "./pages/searchResult/SearchResult.jsx";
import TripsPage from "./pages/tripsPage/Trips.jsx";
import TripDetails from "./pages/tripDetails/TripDetails.jsx";
import BookingForm from "./pages/bookingForm/BookingForm.jsx";
import AccountDetails from "./pages/viewAccountDetails/ViewAccountDetails.jsx";
import BookingList from "./pages/bookingList/BookingList.jsx";
import BookingDetails from "./pages/bookingDetails/BookingDetails.jsx";
import Navbar from "./components/navbar/Navbar.jsx";
import ViewNotification from "./pages/viewNotifications/ViewNotifications.jsx";
import PageNotAvailable from "./components/pageNotAvailable/PageNotAvailable.jsx";

const Router = () => {
  const [active, setActive] = useState("view-account");

  return (
    <BrowserRouter>
      <Navbar setActive={setActive} />
      <Routes>
        <Route path="/" element={<Signin />} exact />
        <Route path="/setPassword" element={<SetPassword />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route
          path="/token-validation/Frontend-user/:id/:token"
          element={<ResetPassword />}
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/searchResult" element={<SearchResult />} />
        <Route path="/notifications" element={<ViewNotification />} />
        <Route path="/trips" element={<TripsPage />} />
        <Route path="/tripDetails/:id" element={<TripDetails />} />
        <Route path="/bookingForm" element={<BookingForm />} />
        <Route
          path="/accountDetails"
          element={<AccountDetails active={active} setActive={setActive} />}
        />
        <Route path="/booking" element={<BookingList />} />
        <Route
          path="/bookingDetails/:userId/:bookingId"
          element={<BookingDetails />}
        />
        <Route path="*" element={<PageNotAvailable />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

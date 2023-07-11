import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard/dashboard";
import PageError from "./components/Error/PageError";

import BookingList from "./pages/BookingList/bookingList";
import BookingDetails from "./pages/BookingDetails/bookingDetails";
import CancelNotification from "./pages/CancelNotification/cancelNotification";

import Travel from "./pages/Travel/travel";
import OccasionPage from "./pages/Occasion/occasionPage";
import AmenitiesPage from "./pages/Amenities/amenitiesPage";
import Tripcat from "./pages/TripCategory/tripcat";
import TripListPage from "./pages/TripList/tripListPage";
import AddNewTrip from "./pages/AddNewTrip/addNewTrip";
import UpdateTrip from "./pages/UpdateTrip/UpdateTrip";
import AdminLogin from "./pages/AdminLoginForm/AdminLoginForm.jsx";
import ForgotPassword from "./pages/AdminForgotPassword/AdminForgotPassword.jsx";
import ResetPassword from "./pages/AdminResetPassword/AdminResetPassword.jsx";
import Signup from "./pages/AdminSignUp/AdminSignUp.jsx";
import BookingNotesPage from "./pages/BookingNotesPage/BookingNotesPage";
import { CheckUrlPath } from "./functions/pathChecker";

const Router = () => {
  return (
    <BrowserRouter>
      {/* <div className="flex"> */}
      {/* <CheckUrlPath /> */}
      <Routes>
        <Route exact path="/" element={<AdminLogin />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/travel-type" element={<Travel />} />
        <Route exact path="/occasions-list" element={<OccasionPage />} />
        <Route exact path="/all-amenities" element={<AmenitiesPage />} />
        <Route exact path="/trip-categories" element={<Tripcat />} />
        <Route exact path="/list-of-trips" element={<TripListPage />} />
        <Route exact path="/trip-list/add-trip" element={<AddNewTrip />} />
        <Route
          exact
          path="/update-module/trip-package/:id"
          element={<UpdateTrip />}
        />

        <Route exact path="/booking-list" element={<BookingList />} />
        <Route exact path="/booking-notes" element={<BookingNotesPage />} />
        <Route
          exact
          path="/booking-list/booking-details/:id"
          element={<BookingDetails />}
        />
        <Route exact path="/cancel-requests" element={<CancelNotification />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/forgot-password" element={<ForgotPassword />} />
        <Route exact path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/token-validation/:user/:id/:token"
          element={<ResetPassword />}
        />
        <Route exact path="*" element={<PageError />} />
      </Routes>
      {/* </div> */}
    </BrowserRouter>
  );
};

export default Router;

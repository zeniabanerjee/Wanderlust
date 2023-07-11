import React, { useEffect, useState } from "react";

import "./style.scss";
import Header from "../../components/tripsPage/header/Header";
import TripCategory from "../../components/searchResult/tripCategory/TripCategory";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Footer from "../../components/footer/Footer";

export default function Trips() {
  const [checkinDate, setCheckinDate] = useState("");
  const [checkoutDate, setCheckoutDate] = useState("");
  const [tripFilterClicked, setTripFilterClicked] = useState(0);
  const [filterDestination, setFilterDestination] = useState([]);
  const [filterPerson, setFilterPerson] = useState("");
  const { FrontendUserData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!FrontendUserData) navigate("/");
  });

  return (
    <section className="trips ">
      <Header
        setFilterPerson={setFilterPerson}
        setFilterDestination={setFilterDestination}
        tripFilterClicked={tripFilterClicked}
        setTripFilterClicked={setTripFilterClicked}
        setCheckInDate={setCheckinDate}
        setCheckOutDate={setCheckoutDate}
      />
      <TripCategory
        filterPerson={filterPerson}
        filterDestination={filterDestination}
        tripFilterClicked={tripFilterClicked}
        checkinDate={checkinDate}
        checkOutDate={checkoutDate}
      />
      <Footer />
    </section>
  );
}

import React, { useEffect } from "react";
import "./style.scss";
import TripCategory from "../../components/searchResult/tripCategory/TripCategory";
import Header from "../../components/searchResult/header/Header";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../../components/loading/loadingScreen";
import Footer from "../../components/footer/Footer";
export default function SearchResult() {
  const { FrontendUserData, error, loading } = useSelector(
    (state) => state.user
  );
  const navigate = useNavigate();
  useEffect(() => {
    if (!FrontendUserData) navigate("/");
  });

  return (
    <>
      {loading && <LoadingScreen />}
      <section className="search-result ">
        <Header />
        <TripCategory />
        <Footer />
      </section>
    </>
  );
}

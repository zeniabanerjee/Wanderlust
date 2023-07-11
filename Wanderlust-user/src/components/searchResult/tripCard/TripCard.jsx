import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import shareIcon from "../../../assets/images/searchResult/tripCard/share-icon.svg";
import readMoreIcon from "../../../assets/images/searchResult/tripCard/more-arrow.svg";
import reviewStarIcon from "../../../assets/images/searchResult/tripCard/review-star-icon.svg";
import defaultTripImg from "../../../assets/images/searchResult/tripCategory/trip-category-card-img-1.png";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import "./style.scss";

export default function TripCard(props) {
  let tripIDRef = useRef();
  const navigate = useNavigate();

  const handleNavigate = (e) => {
    tripIDRef = e.target.getAttribute("data-trip-id");
    navigate("/tripDetails/" + props.data._id);
  };

  return (
    <div className="filter-results-cards lg:hover:scale-105 text-[14px] hover:z-[80] transition-all duration-500  ">
      {/* Remove the classname Hidden from the classlist */}
      <LazyLoadImage
        className="filter-results-card-img  cursor-pointer"
        src={props.data.image}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          currentTarget.src = defaultTripImg;
        }}
        alt={props.data.title + "-image"}
        data-trip-id={props.data._id}
        onClick={handleNavigate}
        effect="blur"
      />
      <div className="gap-5 hidden show-detail-text cursor-pointer">
        <Link to={"/tripDetails/" + props.data._id}>Show detail</Link>
        <img src={readMoreIcon} alt="read-more-icon" />
      </div>
      <div className="result-card-details">
        <p className="location">{props.data.title}</p>
        <p className="trip-date">
          {props.data.duration} {props.data.maximumGuests} People
        </p>
        <div className="flex gap-3">
          <p className="trip-cost">{props.data.price}/-</p>
          <p className="per-night">Night</p>
        </div>
      </div>
    </div>
  );
}

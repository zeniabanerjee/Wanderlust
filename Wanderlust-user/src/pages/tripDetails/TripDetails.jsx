import React, { useEffect, useState } from "react";
import {
  getAllPackages,
  getPackagesById,
} from "../../redux/slices/tripPackageSlice";
import "./style.scss";
import Header from "../../components/tripDetails/header/Header";
import Dates from "../../components/tripDetails/dates/Dates";
import TripHighlights from "../../components/tripDetails/packageHighlights/PackageHighlights";
import Ocassions from "../../components/tripDetails/ocassions/Ocassions";
import { dates, traverTypeData, hostingData } from "./data";
import TravelType from "../../components/tripDetails/travelType/TravelType";
import HostingPartner from "../../components/tripDetails/hostingPartner/HostingPartner";
import PricingDetails from "../../components/tripDetails/pricingDetails/PricingDetails";
import Ammenities from "../../components/tripDetails/ammenities/Ammenities";
import Faqs from "../../components/tripDetails/faqs/Faqs";
import GetApiDatas from "./logic";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NoResponse from "../../components/noResponse/NoResponse";
import Footer from "../../components/footer/Footer";

export default function TripDetails(props) {
  const location = useLocation();
  const dispatch = useDispatch();
  const { tripPackageData } = useSelector((state) => state.tripPackage);

  const { FrontendUserData } = useSelector((state) => state.user);
  const [tripDetails, setTripDetails] = useState();
  const [toShowDetails, setToShowDetails] = useState(false);
  const [details, setDetails] = useState(false);
  const [tripResponseData, setTripResponseData] = useState();
  const [occasions, setOccassions] = useState();
  const [travelType, setTravelType] = useState();
  const [amenities, setAmenities] = useState();

  const currentTripId = useParams();
  const currentUserId = useSelector((state) => state.user)?.FrontendUserData
    ?.data?.userDetails?._id;

  useEffect(() => {
    dispatch(getPackagesById(currentTripId.id));
  }, []);

  useEffect(() => {
    if (tripPackageData) {
      setTripDetails(tripPackageData);
    }
  }, [tripPackageData]);

  useEffect(() => {
    setFeaturesData();
  }, [tripDetails]);

  const tripImage = tripDetails && tripDetails[0]?.image;
  const email = FrontendUserData?.data?.userDetails?.email;
  const phNumber = FrontendUserData?.data?.userDetails?.phone;
  const name = FrontendUserData?.data?.userDetails?.name;
  const backgroundImg = { backgroundImage: `url(${tripImage})` };

  const navigate = useNavigate();
  useEffect(() => {
    if (!FrontendUserData) navigate("/");
  });

  const acitivitiesData = tripDetails && tripDetails[0]?.activities;
  const durationData = tripDetails && tripDetails[0]?.duration;
  const ammenitiesData = tripDetails && tripDetails[0]?.amenities;
  const ocassionData = tripDetails && tripDetails[0]?.occasions;
  const faqData = tripDetails && tripDetails[0]?.faq;
  const tripHighlightsData = tripDetails && tripDetails[0]?.tripHighlights;
  const tripCost = tripDetails && tripDetails[0]?.price;
  const discountedPrice = tripDetails && tripDetails[0]?.discountedPrice;
  const locationName = tripDetails && tripDetails[0]?.title;
  const explorePlaces = tripDetails && tripDetails[0]?.placeNumber;
  const maximumGuests = tripResponseData?.maximumGuests;

  const bookingFormData = {
    email,
    phNumber,
    name,
    locationName,
    currentTripId,
    currentUserId,
    tripImage,
    maximumGuests,
  };

  const setFeaturesData = () => {
    setOccassions(
      tripDetails &&
        tripDetails[0]?.features?.filter((data) => data.purpose === "occasion")
    );
    setTravelType(
      tripDetails &&
        tripDetails[0]?.features?.filter((data) => data.purpose === "travel")
    );
    setAmenities(
      tripDetails &&
        tripDetails[0]?.features?.filter((data) => data.purpose === "amenity")
    );
  };

  if (tripDetails) {
    return (
      <section className="trip-details " style={backgroundImg}>
        <Header location={locationName} />
        <section className="md:px-8 xl:px-24 2xl:px-40 min-[1920px]:px-[16rem] trip-fetched-details dark-gradient">
          <h1 className="pt-[5rem] lg:text-start">Itinerary</h1>
          <ul className="flex flex-wrap lg:justify-start sm:flex-row gap-5 text-[#838597] my-[3rem] text-[22px]">
            <li>Maximum guests {tripDetails[0]?.maximumGuests}</li>
            <li>Explore {explorePlaces} PLaces </li>
            <li>Available for 6 guests</li>
          </ul>
          <h4 className="mb-[2rem] text-[1.7rem]">Dates</h4>
          <div className="flex flex-wrap gap-5 xl:justify-start justify-center available-dates overflow-x-scroll">
            {acitivitiesData?.map((data, index) => {
              return (
                <Dates
                  day={data.date}
                  details={details}
                  setDetails={setDetails}
                  setToShowDetails={setToShowDetails}
                  key={index}
                  detail={data.details}
                />
              );
            })}
          </div>

          <p className="my-[3rem] text-[#B4BBC1] text-[22px]">
            Till now 4 suits empty for this day, hurry up!
          </p>
          <div className="trip-highlights-container my-5">
            <h2 className="mb-[3rem]">Highlights of the package</h2>
            <div className="flex  flex-wrap gap-10">
              {tripHighlightsData?.map((data, index) => {
                return (
                  <TripHighlights
                    title={data?.title}
                    content={data?.name}
                    imgSrc={data?.icon}
                    key={index}
                  />
                );
              })}
            </div>
          </div>
          <div className="mt-[5rem]">
            <h2 className="mb-[3rem]">Occassions Related</h2>
            <div className="flex flex-wrap justify-start gap-10 xl:gap-[4rem] occassions-cards">
              {occasions &&
                occasions?.map((data, index) => {
                  return (
                    <Ocassions
                      image={data?.icon}
                      type={data?.title}
                      desc={data?.description}
                      key={index}
                    />
                  );
                })}
            </div>
          </div>
          <div className="mt-[5rem]">
            <h2 className="mb-[3rem]">Travel Type</h2>
            <div className="flex  gap-10 xl:gap-[5rem]">
              {travelType?.map((data, index) => {
                return (
                  <TravelType
                    title={data?.title}
                    image={data?.icon}
                    key={index}
                  />
                );
              })}
            </div>
          </div>
          <div className="mt-[5rem] payment-details-container flex flex-col lg:flex-row lg:gap-20">
            {hostingData?.map((data, index) => {
              return <HostingPartner key={index} content={data?.content} />;
            })}

            <PricingDetails
              bookingFormData={bookingFormData}
              maxGuests={tripDetails && tripDetails[0]?.maximumGuests}
              originalPrice={tripCost}
              discountedPrice={discountedPrice}
            />
          </div>
          <div className="mt-20 lg:mt-[9rem] ammenities-container">
            <h2 className="font-[400] mt-20 lg:mt-40 mb-[3.5rem]">
              Ammenities (<span>{amenities?.length}</span>)
            </h2>
            <div className="flex flex-wrap 2xl:justify-start gap-[1.7rem] lg:justify-start ammenities-container">
              {amenities?.map((data, index) => {
                return (
                  <Ammenities
                    image={data?.icon}
                    key={index}
                    title={data?.title}
                  />
                );
              })}
            </div>
          </div>
          <h2 className="mt-20 lg:mt-[9rem] mb-10">FAQs</h2>
          <ul className="faqs-container flex flex-col gap-10 pb-[10rem] min-[480px]:pb-5">
            {faqData?.map((data, index) => {
              return (
                <Faqs
                  key={index}
                  question={data?.question}
                  answer={data?.answer}
                />
              );
            })}
          </ul>
          <Footer />
        </section>
      </section>
    );
  } else {
    return (
      <>
        <NoResponse
        //inlude statusCode and response message in the parameters
        />
        <Footer />
      </>
    );
  }
}

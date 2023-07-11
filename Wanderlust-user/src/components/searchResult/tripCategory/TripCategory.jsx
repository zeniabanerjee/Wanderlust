import "./style.scss";
import "../../../style/animations.scss";
import "../../../style/animations.scss";
import React, { useEffect, useState, useRef } from "react";
import sortIcon from "../../../assets/images/searchResult/tripCategory/sort-icon.svg";
import filterIcon from "../../../assets/images/searchResult/tripCategory/filter-icon.svg";
import TripCard from "../tripCard/TripCard";
import FilterCategories from "../filterCategories/FilterCategories";
import { sortData } from "./logic";
import "rc-slider/assets/index.css";
import defaultCategoryImg from "../../../assets/images/searchResult/tripCategory/hills-icon.svg";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getFeature,
  getFilteredFeature,
} from "../../../redux/slices/featureSlice";
import { getAllPackages } from "../../../redux/slices/tripPackageSlice";
import LoadingScreen from "../../loading/loadingScreen";

export default function TripCategory({
  checkinDate,
  checkOutDate,
  tripFilterClicked,
  filterDestination,
  filterPerson,
}) {
  const { featureData } = useSelector((state) => state.feature);
  const { filterFeatureData } = useSelector((state) => state.feature);
  const { tripPackageData, loading } = useSelector(
    (state) => state.tripPackage
  );
  const [allPackagesData, setAllPackagesData] = useState();
  const [allTripCategory, setAllTripCategory] = useState();
  const [showFilter, setShowFilter] = useState(false);
  const [closingAnimation, setClosingAnimation] = useState(false);
  const [closingAnimationSort, setClosingAnimationSort] = useState(false);
  const [showMore, setShowMore] = useState(true);
  const [sortClicked, setSortClicked] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [filterRequirements, setFilterRequirements] = useState({
    title: [],
    maximumGuests: "",
    travelType: [],
    tripCategory: [],
    occasions: [],
    amenities: [],
    price: "",
    checkIn: "",
    checkOut: "",
  });
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFeature("category"));
    dispatch(getAllPackages());
    document.addEventListener("click", hideOnClickOutside, true);
  }, []);

  useEffect(() => {
    if (filterPerson !== "") handleFilterRequirements();
  }, [filterPerson]);

  useEffect(() => {
    handleFilterRequirements();
  }, [filterDestination]);

  useEffect(() => {
    if (tripFilterClicked > 0) {
      handleFilterRequirements();
    }
  }, [tripFilterClicked]);

  const handleFilterRequirements = () => {
    const setFilterRequirementsCopy = { ...filterRequirements };

    if (location.pathname === "/trips") {
      setFilterRequirementsCopy.checkIn = checkinDate;
      setFilterRequirementsCopy.checkOut = checkOutDate;
      setFilterRequirementsCopy.title = filterDestination;
      setFilterRequirementsCopy.maximumGuests = filterPerson;
    }
    setFilterRequirementsCopy.tripCategory = categoryFilter;
    setFilterRequirements(setFilterRequirementsCopy);
  };
  const refOne = useRef(null);

  useEffect(() => {
    dispatch(getFilteredFeature(filterRequirements));
  }, [filterRequirements]);

  useEffect(() => {
    if (filterFeatureData) {
      setAllPackagesData(filterFeatureData.data);
    }
  }, [filterFeatureData]);

  useEffect(() => {
    if (featureData) {
      setAllTripCategory(featureData);
    }
  }, [featureData]);

  useEffect(() => {
    if (tripPackageData) {
      tripPackageData &&
        tripPackageData?.data &&
        setAllPackagesData(
          tripPackageData?.data?.filter((item) => item.status !== "In-Active")
        );
    }
  }, [tripPackageData]);

  const hideOnClickOutside = (e) => {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setSortClicked(false);
    }
  };

  const handleFilterStateChange = () => {
    if (showFilter) {
      setClosingAnimation(true);
      setTimeout(() => {
        setShowFilter(false);
        setClosingAnimation(false);
      }, 500);
    } else {
      setShowFilter(true);
    }
  };

  const handleSortSelection = (e) => {
    const sortOrder = e.target.getAttribute("data-sort-order");
    const sortCriteria = e.target.getAttribute("data-sort-category");
    sortData(allPackagesData, setAllPackagesData, sortCriteria, sortOrder);
    setSortClicked(false);
  };

  const showMoreToggler = () => {
    setShowMore(!showMore);
  };

  const sortTrips = () => {
    if (sortClicked) {
      setClosingAnimationSort(true);

      setTimeout(() => {
        setSortClicked(false);
        setClosingAnimationSort(false);
      }, 500);
    } else {
      setShowFilter(false);

      setSortClicked(true);
    }
  };

  const handleClickedCategory = (e, targetSelected) => {
    const parentElement = document.querySelector(
      `[data-category-selected="${targetSelected}"]`
    );
    const grandParentElement = parentElement.parentElement;

    if (categoryFilter.includes(targetSelected)) {
      const categoryIndex = categoryFilter.indexOf(targetSelected);
      categoryFilter.splice(categoryIndex, 1);
    } else {
      categoryFilter.push(targetSelected);
    }
    setCategoryFilter(categoryFilter);

    parentElement.classList.toggle("border-amber-500");
    grandParentElement.lastChild.classList.toggle("text-[orange]");

    handleFilterRequirements();
  };
  return (
    <>
      {loading && <LoadingScreen />}
      <section className="trip-category">
        <div className="flex justify-center 2xl:justify-between overflow-auto flex-wrap gap-1 lg:gap-12 trip-category-icons ">
          {allTripCategory?.map((response, index) => {
            return (
              <div
                onClick={(e) => handleClickedCategory(e, response.title)}
                className=" p-1 category-section  lg:p-2 flex flex-col justify-end  "
                key={index}
              >
                <div
                  className="category border-[5px] rounded-[2.5rem] cursor-pointer transition-all duration-200 min-w-[1rem] min-h-[1rem] lg:max-w-[9rem] lg:max-h-[9rem] flex justify-center"
                  data-category-selected={response.title}
                >
                  <img
                    src={response.icon}
                    alt={response.title}
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null; // prevents looping
                      currentTarget.src = defaultCategoryImg;
                    }}
                    className="category-icon saturate-0 m-2 md:m-8 lg:m-0 lg:p-7"
                  />
                </div>
                <p className="text-center text-[16px] max-w-[9rem] category-title">
                  {response.title}
                </p>
              </div>
            );
          })}
        </div>
        <div className="my-[3.75rem] flex justify-start relative items-start text-[16px] gap-[4.75rem] ">
          <div className="flex flex-col gap-[1.5rem] ">
            <button onClick={sortTrips} ref={refOne}>
              <div className="flex justify-center relative gap-[1rem]">
                <img src={sortIcon} alt="sort-icon" />
                <p className="">Sort</p>
              </div>
            </button>
            <ul
              className={
                "bg-transparent flex flex-col gap-[1rem] sort-list absolute z-[81] top-[3rem] outline-none openning-animation-y " +
                (sortClicked ? "flex  " : "hidden") +
                (closingAnimationSort ? " closing-animation-y " : "")
              }
            >
              <li
                data-sort-category={"price"}
                data-sort-order={"ascending"}
                onClick={handleSortSelection}
              >
                By Price - Low to High
              </li>
              <li
                data-sort-category={"price"}
                data-sort-order={"descending"}
                onClick={handleSortSelection}
              >
                By Price - High to Low
              </li>
              <li
                data-sort-category={"name"}
                data-sort-order={"ascending"}
                onClick={handleSortSelection}
              >
                By Name - A - Z
              </li>
              <li
                data-sort-category={"name"}
                data-sort-order={"descending"}
                onClick={handleSortSelection}
              >
                By Name - Z - A
              </li>
            </ul>
          </div>
          <button onClick={handleFilterStateChange}>
            <div className="flex gap-[1rem]">
              <img src={filterIcon} alt="filter-icon" />
              <p className="">Filter</p>
            </div>
          </button>
        </div>
        <div className={"flex flex-col xl:flex-row gap-[1.1rem] "}>
          <div
            className={
              "trip-category-filters flex flex-col lg:flex-row justify-between xl:justify-normal xl:flex-col gap-[2.2rem] xl:gap-[3.4rem] xl:w-[25%] p-7 lg:p-8 2xl:p-[1.6rem] xl:pb-10 xl:h-[42rem] overflow-y-scroll bg-[#212b33] rounded-[2rem]  openning-animation-y " +
              (showFilter ? "" : "hidden") +
              (closingAnimation ? " closing-animation-y " : "")
            }
          >
            <FilterCategories
              filterRequirements={filterRequirements}
              setFilterRequirements={setFilterRequirements}
            />
          </div>

          <div
            className={
              "trip-category-filter-results all-trip-list grid  grid-flow-col overflow-scroll  md:h-[42rem] overflow-y-scroll px-5 transition-all duration-300" +
              (showFilter ? " xl:w-[75%]  " : "")
            }
          >
            {showMore
              ? allPackagesData &&
                allPackagesData?.slice(0, 8).map((data, index) => {
                  return <TripCard data={data} key={index} />;
                })
              : allPackagesData &&
                allPackagesData?.map((data, index) => {
                  return <TripCard data={data} key={index} />;
                })}
          </div>
        </div>
        <div className="flex justify-end mt-[5rem] show-more">
          <p onClick={showMoreToggler}>{showMore ? "See More" : "See Less"}</p>
        </div>
      </section>
    </>
  );
}

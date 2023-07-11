import { React, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPackage } from "../../redux/actions/addPackageActions";
import tempIcon from "../../assets/images/trip-list/imgplaceholders.jpeg";
import MultipleTripForm from "../MultipleTripForm/MultipleTripForm";
import TagsInput from "../TagsInput/TagsInput";
import SelectMenu from "../SelectMenu/SelectMenu";
import Faq from "../Faq/Faq";
import StatusMenu from "../StatusMenu/StatusMenu";
import DateRangeComp from "../DateRange/DateRangeComp";
import { Status, GetOptions } from "./tripFormSelect.jsx";
import MultipleDateInputs from "../MultipleDateInputs/MultipleDateInputs";
import LoadingScreen from "../Loading/LoadingScreen";
import addDays from "date-fns/addDays";
import { useNavigate } from "react-router-dom";
import convertYearDate from "../../functions/yearMonthDate";
import AlertComponent from "../Alerts/AlertComponent";

const NewTripForm = () => {
  const {
    occassionOptions,
    tripCategoryOptions,
    travelTypeOptions,
    amenitiesOptions,
  } = GetOptions();
  const { data } = useSelector((state) => state.getPackage);
  const navigate = useNavigate();
  const {
    data: addedPackage,
    loading,
    error,
  } = useSelector((state) => state.addPackage);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState();
  const [image, setImage] = useState("");
  const [briefd, setBriefd] = useState("");
  const [status, setStatus] = useState("");
  const [placeNumber, setPlaceNumber] = useState("");
  const [maximumGuests, setMaximumGuests] = useState("");
  const [tripCategory, setTripCategory] = useState([]);
  const [occasions, setOccasions] = useState([]);
  const [travelType, setTravelType] = useState([]);

  const [price, setPrice] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState("");
  const [amenities, setAmenities] = useState([]);
  const [duration, setDuration] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: "selection",
    },
  ]);
  const [faqFields, setFaqFields] = useState([
    {
      question: "",
      answer: "",
    },
  ]);
  const [inputFields, setInputFields] = useState([
    {
      title: "",
      name: "",
      description: "",
      images: "",
      showIcon: "",
    },
  ]);

  const addInputField = () => {
    setInputFields([
      ...inputFields,
      {
        title: "",
        name: "",
        description: "",
        images: "",
        showIcon: "",
      },
    ]);
  };
  const addFaqField = () => {
    setFaqFields([
      ...faqFields,
      {
        question: "",
        answer: "",
      },
    ]);
  };
  const [arrayDate, setArrayDate] = useState();

  const dispatch = useDispatch();

  function handleChange(e) {
    if (e.target.files[0]) {
      const maxLimit = 5242880;
      if (e.target.files[0].size > maxLimit) {
        AlertComponent("warning", "", "Maximum Size is 5 MB");
      } else {
        setFile(URL.createObjectURL(e.target.files[0]));
        setImage(e.target.files[0]);
      }
    }
  }
  const dateMonthFromat = duration?.split(" - ");
  const startDate = convertYearDate(`${dateMonthFromat[0]}`);
  const endDate = convertYearDate(`${dateMonthFromat[1]}`);

  const submitHandler = () => {
    if (maximumGuests >= 100) {
      AlertComponent("warning", "", "Ops We have Max capacity of 100 Guests ");
    } else if (Number(discountedPrice) > Number(price)) {
      AlertComponent(
        "warning",
        "",
        "Discounted Price can't be More than Original Price"
      );
    } else if (
      title &&
      image &&
      duration &&
      startDate &&
      endDate &&
      arrayDate &&
      tripCategory &&
      placeNumber &&
      maximumGuests &&
      inputFields &&
      price &&
      discountedPrice &&
      occasions &&
      travelType &&
      amenities &&
      briefd &&
      status
    ) {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("images", image);
      formData.append("duration", duration);
      formData.append("startDate", startDate);
      formData.append("endDate", endDate);
      formData.append("activities", JSON.stringify(arrayDate));
      formData.append(
        "tripCategory",
        JSON.stringify(tripCategory.map((trip) => trip.value))
      );
      formData.append("placeNumber", placeNumber);
      formData.append("maximumGuests", maximumGuests);

      for (let i = 0; i < inputFields.length; i++) {
        if (inputFields[i].images.length > 0) {
          formData.append("images", inputFields[i].images);
        } else {
          AlertComponent("warning", "", "Image is required");
        }
      }
      formData.append("tripHighlights", JSON.stringify(inputFields));
      formData.append("price", price);
      formData.append("discountedPrice", discountedPrice);
      formData.append(
        "occasions",
        JSON.stringify(occasions.map((occasion) => occasion.value))
      );
      formData.append("travelType", JSON.stringify(travelType.value));
      formData.append("amenities", JSON.stringify(amenities));
      formData.append("briefDescription", briefd);
      formData.append("faq", JSON.stringify(faqFields));
      formData.append("status", status.value);
      if (formData) {
        dispatch(addPackage(formData));
      }
    } else {
      AlertComponent("warning", "", "All Fields Are Requried");
    }
  };

  useEffect(() => {
    if (addedPackage?.success) {
      dispatch({ type: "ADD_PACKAGE_SUCCESS", payload: null });
      AlertComponent("success", addedPackage);

      navigate("/list-of-trips");
    } else if (addedPackage?.success === false) {
      AlertComponent("failed", addedPackage);

      dispatch({ type: "ADD_PACKAGE_SUCCESS", payload: null });
    }
  }, [addedPackage]);

  useEffect(() => {
    if (error) {
      AlertComponent("error", error);
      dispatch({ type: "ADD_PACKAGE_FAILED", payload: null });
    }
  }, [error]);

  return (
    <>
      {loading && <LoadingScreen />}
      <div className="flex-col flex xl:flex-row">
        <div className="md:w-1/3 bg-[#f5f7f7] rounded-lg m-4 p-4 h-[50%] mx-auto">
          <div className="flex justify-center">
            {file ? (
              <img
                src={file}
                className="h-[10rem] lg:h-auto"
                alt="browserIcon"
              />
            ) : (
              <img src={tempIcon} alt="browserIcon" />
            )}
          </div>
          <div className=" flex justify-center mt-2">
            <div className="relative">
              <button className="border-2 border-red-500 px-2 rounded-md text-red-500">
                Browse
              </button>
              <input
                type="file"
                accept=".jpg,.png,.jpeg,.svg"
                className=" absolute left-0 opacity-0 cursor-pointer w-full"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className=" w-full ">
          <div className="p-2 flex flex-col space-y-2">
            <h2 className="text-start text-2xl font-semibold">Add New Trip</h2>
            <label className=" text-gray-400">Trip Package Title</label>
            <input
              className="border-2 py-2 rounded-md"
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div className="p-2 flex flex-col space-y-2">
            <h2 className="text-start font-bold">
              Trip Duration & Day Activities
            </h2>
            <label className=" text-gray-400">Duration (select dates) </label>

            <DateRangeComp
              duration={duration}
              setDuration={setDuration}
              range={range}
              setRange={setRange}
            />
            <div className="mr-2">
              {duration && (
                <MultipleDateInputs
                  duration={duration}
                  arrayDate={arrayDate}
                  setArrayDate={setArrayDate}
                />
              )}
            </div>
          </div>
          <div className="p-2 flex flex-col space-y-2">
            <div className="flex-col flex md:flex-row justify-between ">
              <div className="flex flex-col w-full">
                <label className=" text-gray-400 ">Trip category</label>
                <SelectMenu
                  options={tripCategoryOptions}
                  value={tripCategory}
                  width="100%"
                  setvalue={setTripCategory}
                />
              </div>
              <div className="flex flex-col md:px-3">
                <label className=" text-gray-400">No. of places</label>
                <input
                  className="border-2 py-2 rounded-md"
                  type="number"
                  value={placeNumber}
                  onChange={(e) => {
                    setPlaceNumber(e.target.value);
                  }}
                />
              </div>
              <div className="flex flex-col md:px-3">
                <label className=" text-gray-400">Maximum guests</label>
                <input
                  className="border-2 py-2 rounded-md"
                  type="number"
                  value={maximumGuests}
                  onChange={(e) => {
                    setMaximumGuests(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="p-2 flex flex-col space-y-2">
            <div className="flex justify-between">
              <h1 className=" font-bold">Trip Highlights</h1>
              <button
                className="border-2 border-red-500 px-2 rounded-md text-red-500 "
                onClick={addInputField}
              >
                Add New
              </button>
            </div>
            <MultipleTripForm
              inputFields={inputFields}
              setInputFields={setInputFields}
              editMode={editMode}
              setEditMode={setEditMode}
            />
          </div>
          <div className="p-2 grid grid-col-4 flex-col space-y-2">
            <div className="flex justify-between w-full">
              <div className="flex flex-col  w-full">
                <label className=" text-gray-400">Price</label>
                <input
                  className="border-2 py-2 rounded-md w-[90%]"
                  type="number"
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                />
              </div>
              <div className="flex flex-col w-full">
                <label className=" text-gray-400"> Discounted Price</label>
                <input
                  className="border-2 py-2 rounded-md w-[90%]"
                  type="number"
                  value={discountedPrice}
                  onChange={(e) => {
                    setDiscountedPrice(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="flex justify-between w-full">
              <div className="flex flex-col w-full">
                <label className=" text-gray-400">Occassion's</label>
                <SelectMenu
                  options={occassionOptions}
                  width="91%"
                  value={occasions}
                  setvalue={setOccasions}
                />
              </div>
              <div className="flex flex-col w-full">
                <label className=" text-gray-400">Travel type</label>
                <StatusMenu
                  width="91%"
                  options={travelTypeOptions}
                  value={travelType}
                  onChange={(e) => {
                    setTravelType(e);
                  }}
                  textPlaceholder="Select Travel Type"
                />
              </div>
            </div>
          </div>
          <div className="p-2 flex flex-col space-y-2 ">
            <TagsInput
              heading="Amenities"
              tags={amenities}
              setTags={setAmenities}
              options={amenitiesOptions}
            />
          </div>
          <div className="p-2 flex flex-col space-y-2 ">
            <label className=" text-gray-400">Brief description</label>
            <textarea
              rows="5"
              cols="33"
              type="text"
              className="border-2 rounded-md resize-none"
              name="d"
              value={briefd}
              onChange={(e) => {
                setBriefd(e.target.value);
              }}
            />
          </div>
          <div className="p-2 flex flex-col space-y-2 ">
            <div className="flex justify-between">
              <h1 className=" font-bold">FAQ </h1>
              <button
                className="border-2 border-red-500 px-2 rounded-md text-red-500 "
                onClick={addFaqField}
              >
                Add More
              </button>
            </div>
            <Faq
              faqFields={faqFields}
              setFaqFields={setFaqFields}
              addFaqField={addFaqField}
            />
          </div>
          <div className="p-2 flex flex-col space-y-2 ">
            <div className=" flex justify-between items-center w-full space-x-3">
              <StatusMenu
                width="100%"
                options={Status}
                value={status}
                onChange={(e) => {
                  setStatus(e);
                }}
                textPlaceholder="Status"
              />
              <button
                className="bg-[#CD4B43] text-white rounded-md w-1/2 p-3"
                onClick={submitHandler}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewTripForm;

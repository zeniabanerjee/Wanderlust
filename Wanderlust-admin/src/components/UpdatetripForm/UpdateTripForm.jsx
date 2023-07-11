import { React, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updatePackage } from "../../redux/actions/addPackageActions";
import tempIcon from "../../assets/images/trip-list/AddNewTrip-icon.svg";
import MultipleTripForm from "../MultipleTripForm/MultipleTripForm";
import TagsInput from "../TagsInput/TagsInput";
import SelectMenu from "../SelectMenu/SelectMenu";
import Faq from "../Faq/Faq";
import StatusMenu from "../StatusMenu/StatusMenu";
import DateRangeComp from "../DateRange/DateRangeComp";
import { GetOptions, Status } from "../NewTripForm/tripFormSelect";
import MultipleDateInputs from "../MultipleDateInputs/MultipleDateInputs";
import LoadingScreen from "../Loading/LoadingScreen";
import { getSinglePackage } from "../../redux/actions/addPackageActions";
import addDays from "date-fns/addDays";
import convertDate from "../../functions/monthFormat";
import convertYearDate from "../../functions/yearMonthDate";
import AlertComponent from "../Alerts/AlertComponent";

const NewTripForm = () => {
  const { id } = useParams();

  const {
    occassionOptions,
    tripCategoryOptions,
    travelTypeOptions,
    amenitiesOptions,
  } = GetOptions();
  const { data } = useSelector((state) => state.getSinglePackage);
  const {
    data: updatedPackage,
    loading,
    error,
  } = useSelector((state) => state.updatePackage);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState();
  const [image, setImage] = useState("");
  const [briefd, setBriefd] = useState("");
  const [status, setStatus] = useState("");
  const [placeNumber, setPlaceNumber] = useState("");
  const [maximumGuests, setMaximumGuests] = useState("");
  const [tripCategory, setTripCategory] = useState([]);
  const [occasions, setOccasions] = useState([]);
  const [travelType, setTravelType] = useState("");
  const [price, setPrice] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState("");
  const [amenities, setAmenities] = useState([]);
  const [duration, setDuration] = useState("");
  const [editMode, setEditMode] = useState(true);
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: "selection",
    },
  ]);
  const [arrayDate, setArrayDate] = useState();
  const [faqFields, setFaqFields] = useState([
    {
      question: "",
      answer: "",
    },
  ]);
  const [indexes, setIndexes] = useState([]);

  const [inputFields, setInputFields] = useState([
    {
      title: "",
      name: "",
      description: "",
      icon: "",
    },
  ]);

  const addFaqField = () => {
    setFaqFields([
      ...faqFields,
      {
        question: "",
        answer: "",
      },
    ]);
  };

  useEffect(() => {
    dispatch(getSinglePackage(id));
  }, []);
  const dispatch = useDispatch();

  function handleChange(e) {
    if (e.target.files[0]) {
      const maxLimit = 5242880;
      if (e.target.files[0].size > maxLimit) {
        AlertComponent("warning", "", "Maximum Size is 5 MB");
      } else {
        setFile(URL.createObjectURL(e.target.files[0]));
        setImage(e.target.files[0]);
        const obj = indexes;

        if (obj[0] !== 0) obj.unshift(0);

        setIndexes(obj);
      }
    }
  }
  const addInputField = () => {
    setInputFields([
      ...inputFields,
      {
        title: "",
        name: "",
        description: "",
        icon: "",
      },
    ]);
  };

  useEffect(() => {
    if (data && data?.data) {
      setStatus({
        label: data && data.data[0].status,
        value: data && data.data[0].status,
      });
      setBriefd(data && data.data[0].briefDescription);
      setTravelType({
        label: data && data.data[0].travelType,
        value: data && data.data[0].travelType,
      });
      setDiscountedPrice(data.data[0].discountedPrice);
      setPrice(data?.data[0].price);
      setMaximumGuests(data?.data[0].maximumGuests);
      setPlaceNumber(data?.data[0].placeNumber);
      setTitle(data && data?.data[0].title);
      setInputFields(data?.data[0].tripHighlights);
      setFaqFields(data?.data[0].faq);
      setAmenities(data?.data[0].amenities);
      setFile(data?.data[0].image);
      setArrayDate(data?.data[0]?.activities);
      data?.data[0]?.tripCategory?.map((item) => {
        setTripCategory([...tripCategory, { label: item, value: item }]);
      });

      data?.data[0]?.occasions?.forEach((item) => {
        return setOccasions([...occasions, { label: item, value: item }]);
      });

      setDuration(data?.data[0].duration);
      setRange([
        {
          startDate: new Date(
            convertDate(data?.data[0].duration.split("-")[0])
          ),
          endDate: new Date(convertDate(data?.data[0].duration.split("-")[1])),
          key: "selection",
        },
      ]);
    }
    if (data?.data[0].duration) {
      const dateMonthFromat = duration?.split(" - ");
      setStartDate(convertYearDate(`${dateMonthFromat[0]}`));
      setEndDate(convertYearDate(`${dateMonthFromat[1]}`));
    }
  }, [data]);

  const submitHandler = () => {
    const formData = new FormData();
    formData.append("title", title);
    if (!image) {
      formData.append("images", file);
    } else {
      formData.append("images", image);
    }

    formData.append("duration", duration);
    formData.append("startDate", startDate);
    formData.append("endDate", endDate);
    formData.append("indexes", JSON.stringify(indexes));
    formData.append("activities", JSON.stringify(arrayDate));
    formData.append(
      "tripCategory",
      JSON.stringify(tripCategory.map((trip) => trip.value))
    );
    formData.append("placeNumber", placeNumber);
    formData.append("maximumGuests", maximumGuests);

    for (let i = 0; i < inputFields.length; i++) {
      formData.append("images", inputFields[i].images);
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
      dispatch(updatePackage(id, formData));
    } else {
      AlertComponent("warning", "", "All fields are required");
    }
  };

  useEffect(() => {
    if (updatedPackage?.success) {
      dispatch({ type: "UPDATE_PACKAGE_SUCCESS", payload: null });
      AlertComponent("success", updatedPackage);
      setTimeout(() => {
        navigate("/list-of-trips");
      }, 2000);
    } else if (updatedPackage?.success === false) {
      AlertComponent("failed", updatedPackage);
      dispatch({ type: "UPDATE_PACKAGE_SUCCESS", payload: null });
    }
  }, [updatedPackage]);

  useEffect(() => {
    if (error) {
      AlertComponent("error", error);
      dispatch({ type: "UPDATE_PACKAGE_FAILED", payload: null });
    }
  }, [error]);

  return (
    <>
      {loading && <LoadingScreen />}
      <div className="flex-col flex md:flex-row">
        <div className="md:w-1/3 bg-[#f5f7f7] rounded-lg m-4 p-4 h-[50%]">
          <div className="flex justify-center">
            {file ? (
              <img src={file} alt="browserIcon" />
            ) : (
              <img src={tempIcon} alt="browserIcon" />
            )}
          </div>
          <div className=" flex justify-center">
            <div className="relative">
              <button className="border-2 border-red-500 px-2 rounded-md text-red-500">
                Browse
              </button>
              <input
                type="file"
                accept=".jpg,.png,.jpeg,.svg"
                className=" absolute left-[10%] opacity-0 cursor-pointer w-full"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className=" w-full ">
          <div className="p-2 flex flex-col space-y-2">
            <h2 className="text-start text-2xl font-semibold">Update Trip</h2>
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
            <label className=" text-gray-400">Duration</label>
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
                  editMode={editMode}
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
              setIndexes={setIndexes}
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
                  textPlaceholder="Select Travel type"
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

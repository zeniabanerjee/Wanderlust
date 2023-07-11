import { React, useEffect, useRef, useState } from "react";
import "./style.scss";
import Autocomplete from "./TagsSuggestion";
const TagsInput = ({ heading, tags, setTags, options }) => {
  const [show, setShow] = useState(false);
  const addTags = (event) => {
    if (event.key === "Enter" && event.target.value !== "") {
      if (
        !tags.includes(event.target.value) &&
        options.includes(event.target.value)
      ) {
        setTags([...tags, event.target.value]);
      }

      event.target.value = "";

      setState({
        filteredOptions: [...options],
        showOptions: false,
      });
    }
  };

  const removeTags = (index) => {
    setTags([...tags.filter((tag) => tags.indexOf(tag) !== index)]);
  };

  const tagRef = useRef(null);

  const handleClickOutside = (e) => {
    if (tagRef.current && !tagRef.current.contains(e.target)) {
      setShow(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, "true");
  }, []);


  const [state, setState] = useState({
    filteredOptions: [],
    showOptions: false,
  });

  useEffect(() => {
    if (options) {
      options &&
        setState({
          filteredOptions: [...options],
          showOptions: false,
        });
    }
  }, [options]);

  const onChange = (e) => {
    const userInput = e.target.value;

    const filteredOptions = options?.filter(
      (optionName) =>
        optionName.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    setState({
      filteredOptions,
      showOptions: true,
    });
  };

  return (
    <div className="w-full relative" ref={tagRef}>
      <h2 className=" text-gray-400 py-2">{heading}</h2>
      <div className="tags-input  overflow-scroll ">
        <div className=" gap-2 grid grid-cols-2 md:grid-cols-3  text-[#CD4B43]">
          {tags.map((tag, index) => {
            return (
              <div
                className=" bg-[#F3E3E2] my-2 flex rounded-lg  items-center p-2 justify-center "
                key={index}
              >
                <span className="break-all">{tag}</span>
                <button onClick={() => removeTags(index)}>
                  <i className="fas fa-regular fa-xmark ms-2"></i>
                </button>
              </div>
            );
          })}
        </div>
        <input
          type="text"
          onKeyUp={(event) => addTags(event)}
          className="w-full"
          placeholder="Press enter to add tags"
          onChange={onChange}
          onFocus={() => setShow(true)}
        />
      </div>
      {show && (
        <Autocomplete
          state={state}
          setState={setState}
          options={options}
          setTags={setTags}
          tags={tags}
          setShow={setShow}
        />
      )}
    </div>
  );
};

export default TagsInput;

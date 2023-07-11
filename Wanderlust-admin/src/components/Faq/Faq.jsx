import React from "react";
function Faq({ faqFields, setFaqFields, addFaqField }) {
  const removefaqFields = (index) => {
    const rows = [...faqFields];
    rows.splice(index, 1);
    setFaqFields(rows);
  };
  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const list = [...faqFields];
    list[index][name] = value;
    setFaqFields(list);
  };
  return (
    <div className="col-sm-8">
      {faqFields.map((data, index) => {
        return (
          <div className="row my-3" key={index}>
            <div className="flex items-center">
              <div className="flex justify-between w-full">
                <div className=" flex flex-col w-full">
                  <label className=" text-gray-400">Question</label>
                  <input
                    type="text"
                    className="border-2  p-2 rounded-md w-full"
                    onChange={(e) => handleChange(index, e)}
                    value={data.question}
                    name="question"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <label className="  text-gray-400">Answer</label>
              <textarea
                rows="5"
                cols="33"
                type="text"
                value={data.answer}
                className="border-2 rounded-md resize-none"
                onChange={(e) => handleChange(index, e)}
                name="answer"
              />
            </div>
            <div className="mt-2">
              {faqFields.length !== 1 ? (
                <button
                  className="border-2 border-red-500 px-2 rounded-md text-red-500 "
                  onClick={removefaqFields}
                >
                  Remove
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Faq;

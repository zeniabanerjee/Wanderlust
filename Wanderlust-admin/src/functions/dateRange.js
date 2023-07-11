import format from "date-fns/format";
function dateRange(startDate, endDate, steps = 1) {
  const dateArray = [];
  let currentDate = new Date(startDate);

  while (currentDate <= new Date(endDate)) {
    dateArray.push({
      date: format(new Date(currentDate), "dd LLLL"),
      details: "",
    });
    currentDate.setUTCDate(currentDate.getUTCDate() + steps);
  }

  return dateArray;
}

export default dateRange;

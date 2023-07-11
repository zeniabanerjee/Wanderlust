const convertYearDate = (date) => {
  const dateMonthFromat = date?.split("/");
  const newDate = ` ${dateMonthFromat[2]}-${dateMonthFromat[1]}-${dateMonthFromat[0]} `;
  return newDate;
};

export default convertYearDate;

const convertDate = (date) => {
  const dateMonthFromat = date?.split("/");
  const newDate = ` ${dateMonthFromat[1]}/${dateMonthFromat[0]}/${dateMonthFromat[2]} `;
  return newDate;
};

export default convertDate;

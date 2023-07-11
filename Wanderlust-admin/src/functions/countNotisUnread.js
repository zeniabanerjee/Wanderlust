const countNotisUnread = (response, notisUnread, setNotisUnread) => {


  const notisUnreadCopy = [...notisUnread];


  setNotisUnread(response?.data.filter((data) => !data.readStatus));
};

export default countNotisUnread;

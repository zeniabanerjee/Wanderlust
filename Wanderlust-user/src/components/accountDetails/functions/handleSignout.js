import Cookies from "js-cookie";
const handleSignout = () => {
  Cookies.remove("TOKEN");
};

export default handleSignout;

import { useLocation } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Sidebar from "../components/Sidebar/Sidebar";
export const CheckUrlPath = () => {
  const location = useLocation();
  const path = location.pathname;
  let component;
  if (
    path === "/signup" ||
    path === "/forgot-password" ||
    path === "/reset-password" ||
    path === "/signin" ||
    path === "/token-validation/:user/:id/:token"
  ) {
    return <></>;
  } else {
    return <Sidebar />;
  }
};

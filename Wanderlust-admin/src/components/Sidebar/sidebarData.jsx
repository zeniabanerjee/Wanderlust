import dashboardIcon from "../../assets/images/Sidebar/dashboard-icon.svg";
import bookingIcon from "../../assets/images/Sidebar/booking-icon.svg";
import visaIcon from "../../assets/images/Sidebar/visa-icon.svg";
import offerIcon from "../../assets/images/Sidebar/offer-icon.svg";
import b2bIcon from "../../assets/images/Sidebar/b2b-icon.svg";
import faqIcon from "../../assets/images/Sidebar/faq-icon.svg";
import genericIcon from "../../assets/images/Sidebar/generic-icon.svg";
import notesIcon from "../../assets/images/Sidebar/Notes-icon.png"

const SideBarLinks = [
  {
    icon: dashboardIcon,
    heading: "Dashboard",
    path: "/dashboard",
  },
  {
    icon: b2bIcon,
    heading: "Trip Categories",
    path: "/trip-categories",
  },
  {
    icon: visaIcon,
    heading: "All Amenities",
    path: "/all-amenities",
  },
  {
    icon: bookingIcon,
    heading: "Occasions List",
    path: "/occasions-list",
  },
  {
    icon: b2bIcon,
    heading: "Travel Type List",
    path: "/travel-type",
  },
  {
    icon: genericIcon,
    heading: "List of Trips",
    path: "/list-of-trips",
  },
  {
    icon: genericIcon,
    heading: "Booking List",
    path: "/booking-list",
  },
  {
    icon: offerIcon,
    heading: "Booking Notes",
    path: "/booking-notes",
  },
];

export default SideBarLinks;

import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as ROUTES from "../../common/routes";
export const SideBarData = [
  {
    title: "Home",
    path: `${ROUTES.HOME}`,
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Team",
    path: `${ROUTES.GET_STARTED}`,
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: "nav-text",
  },
  {
    title: "Support",
    path: `${ROUTES.GET_STARTED}`,
    icon: <IoIcons.IoMdHelpCircle />,
    cName: "nav-text",
  },
  {
    title: "Products",
    path: `${ROUTES.GET_STARTED}`,
    icon: <FaIcons.FaCartPlus />,
    cName: "nav-text",
  },
];

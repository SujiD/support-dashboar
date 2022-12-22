import { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { SideBarData } from "./SideBarData";
import "./Navbar.css";
import { IconContext } from "react-icons";
import * as ROUTES from "../../common/routes";

export const NavBar = () => {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  let navigate = useNavigate();

  const handleLogout = () => {
    navigate(`${ROUTES.GET_STARTED}`);
    sessionStorage.clear();
  };

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          <Link to="#" className="menu-bars" onClick={showSidebar}>
            {sidebar ? <AiIcons.AiOutlineClose /> : <FaIcons.FaBars />}
          </Link>
          <Link to={ROUTES.HOME} className="logo">
            MarkLogic
          </Link>
          <button className="mx-5 logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            {SideBarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
};

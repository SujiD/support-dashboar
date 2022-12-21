import React from "react";
import { Navbar } from "react-bootstrap";
import Logo from "../components/logo/Logo";

const Header = () => {
  return (
    <Navbar className="p-5"  style={{background: 'none'}}>
      <Logo />
      <h1 className="heading text-light px-3 mb-1" style={{ fontSize: "40px" }}>
        MarkLogic
      </h1>
    </Navbar>
  );
};

export default Header;

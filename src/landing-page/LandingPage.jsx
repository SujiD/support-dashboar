import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";
import landingImage from "../assests/landingPage.svg";
import Header from "./Header";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div
      className="main-container"
      style={{ backgroundImage: `url(${landingImage})` }}
    >
      <Header />
      <div className="sub-container">
        <h1 className="text-light">Welcome to Support Dashboard</h1>
        <Button
          onClick={() => navigate("/authenticate")}
          className="get-started-btn"
        >
          Get Started
        </Button>
        ;
      </div>
    </div>
  );
};

export default LandingPage;

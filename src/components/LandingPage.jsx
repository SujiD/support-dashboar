import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  return <Button onClick={() => navigate("/authenticate")}>Login</Button>;
};

export default LandingPage;

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import * as ROUTES from "../common/routes";

const withAuth = (WrappedComponent) => {
  const WithAuth = (props) => {
    const token = sessionStorage.getItem('token')
    const navigate = useNavigate();

    useEffect(() => {
      if (!token) {
        navigate(`${ROUTES.INITIALIZE}`);
      }
    }, [token, navigate]);

    return <WrappedComponent {...props} />;
  };

  return WithAuth;
};

export default withAuth;

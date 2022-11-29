import { useState, useContext, useEffect } from "react";
import { Button } from "react-bootstrap";
import APIClient from "../api/APIClient";
import { ErrorContext } from "../contexts/ErrorContext";

const AuthenticateTest = () => {
  //   const prepareBody = {
  //     state: "svgnhTsbv&8sNu",
  //     response_mode: "form_post",
  //   };

  //   const authenticateBody = {
  //     // "code"  : "qKdcS4H6-R$10O4lXadplec3msnf",
  //     state: "svgnhTsbv&8sNu",
  //   };

  const [apiClient] = useState(() => new APIClient());
  const { setError } = useContext(ErrorContext);
  //   const [isAuthenticate, setIsAuthenticated] = useState(false);
  useEffect(() => {
    apiClient.authenticateService
      .initializeReq({
        redirect_uri: " http://localhost:3000/authenticate",
        client_id: "12197290340244569131",
        state: "svgnhTsbv&8sNu",
        response_mode: "form_post",
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        setError(err);
        console.log(err.response.data);
      });
  }, [apiClient.authenticateService, setError]);
  return (
    <div>
      <p>Authenticate Page</p>
      {/* <form
        action="submit"
        src={"http://sdb.dev.support.marklogic.com:8005/auth/reports/authorize"}
      ></form> */}
    </div>
  );
};

export default AuthenticateTest;

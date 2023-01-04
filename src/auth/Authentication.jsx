import APIClient from "../api/APIClient";
import { ErrorContext } from "../contexts/ErrorContext";
import { useEffect, useContext, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import SignIn from "../components/login/SignIn";
import Loading from "../components/loading/Loading";
import * as ROUTES from "../common/routes";

const Authentication = () => {
  let [searchParams] = useSearchParams(window.location.search);
  const [apiClient] = useState(() => new APIClient());
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ endpoint: "", payload: {} });
  const { setError } = useContext(ErrorContext);
  const message = searchParams.get("message");
  const state = searchParams.get("state");
  const description = searchParams.get("description");
  const code = searchParams.get("code");

  useEffect(() => {
    setTimeout(() => {
      if (
        description === "No active session found." &&
        message === "login_required"
      ) {
        apiClient.authenticateService
          .sessionPrepare({
            state: state,
            response_mode: "query",
          })
          .then((res) => {
            setFormData({
              endpoint: res.data.endpoint,
              payload: res.data.payload,
            });
            setShowLogin(true);
          })
          .catch((err) => {
            setError(err);
            console.log(err.response.data);
          });
      }
    }, "5000");

    if (code !== null && state) {
      apiClient.authenticateService
        .sessionAuthenticate({
          code: code,
          state: state,
        })
        .then((res) => {
          sessionStorage.setItem("token", res.data.token);
          sessionStorage.setItem("state", state);
          sessionStorage.setItem("expiry", res.data.expires);
          navigate(`${ROUTES.HOME}`);
        })
        .catch((err) => {
          setError(err);
          console.log(err.response.data);
        });
    }
  }, [
    apiClient.authenticateService,
    code,
    description,
    message,
    navigate,
    setError,
    state,
  ]);

  return showLogin && code == null ? (
    <SignIn formData={formData} />
  ) : code !== null ? (
    <Loading />
  ) : (
    <Loading />
  );
};

export default Authentication;

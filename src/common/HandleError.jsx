import { useContext, useEffect, useState } from "react";
import PopUp from "../components/popups/Popup";
import { ErrorContext } from "../contexts/ErrorContext";
import { useNavigate } from "react-router-dom";

function HandleErrors() {
  const { error, setError } = useContext(ErrorContext);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [title, setTitle] = useState("Error");
  const [errorMsg, setErrorMsg] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    if (error !== undefined) {
      if (error.response) {
        if (error.response.status === 403) {
          console.log("Forbidden");
          setTitle("Forbidden Request");
          setErrorMsg("Token Refresh Failed");
          sessionStorage.clear();
          setShowErrorPopup(true);
        } else if (error.response.status === 400) {
          console.log("Unauthorised");
          setTitle("Unauthorised");
          setErrorMsg("Bad request: Invalid JSON");
          sessionStorage.clear();
          setShowErrorPopup(true);
        } else if (error.response.status === 401) {
          console.log("Unauthorised");
          setTitle("session_error");
          setErrorMsg("Session expired");
          setShowErrorPopup(true);
          sessionStorage.clear();
        } else if (error.response.status === 404) {
          setErrorMsg(
            "Opps 404 Error, Unable to connect to the network. Please try again later"
          );
          setTitle("Application not Found");
          setShowErrorPopup(true);
        } else if (error.response.status === 500) {
          setErrorMsg("Internal server error: Something bad happened");
          setTitle("Server Error");
          setShowErrorPopup(true);
          console.log(error.message);
        } else {
          setErrorMsg(
            "Unable to connect to the network. Please try again later"
          );
          setShowErrorPopup(true);
        }
      } else if (error.message) {
        console.log(error.message);
        setErrorMsg(
          "Opps, Unable to connect to the network. Please try again later"
        );
        setShowErrorPopup(true);
      }
      setError(undefined);
    }
  }, [error, setError]);

  return (
    <>
      <PopUp
        showPopup={showErrorPopup}
        setShowPopup={setShowErrorPopup}
        title={title}
        body={errorMsg}
        closeBtnName="Close"
        handleClose={() => navigate("/pagenotfound")}
      />
    </>
  );
}

export default HandleErrors;

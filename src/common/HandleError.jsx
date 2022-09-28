import { useContext, useEffect, useState } from "react";
import PopUp from "../components/popup/Popup";
import { ErrorContext } from "../contexts/ErrorContext";

function HandleErrors() {
  const { error, setError } = useContext(ErrorContext);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (error !== undefined) {
      if (error.response) {
        if (error.response.status === 403) {
          console.log("Forbidden");
          localStorage.clear();
        } else if (error.response.status === 401) {
          console.log("Unauthorised");
          localStorage.clear();
        } else if (error.response.status === 404) {
          setErrorMsg(
            "Unable to connect to the network. Please try again later"
          );
          setShowErrorPopup(true);
        } else if (error.response.status === 500) {
          setErrorMsg("Something went wrong. Please try again");
          setShowErrorPopup(true);
        } else {
          setErrorMsg("Unable to connect to the network. Please try again later");
          setShowErrorPopup(true);
        }
      } else if (error.message) {
        setErrorMsg("Unable to connect to the network. Please try again later");
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
        title="Error"
        body={errorMsg}
        closeBtnName="Close"
      />
    </>
  );
}

export default HandleErrors;

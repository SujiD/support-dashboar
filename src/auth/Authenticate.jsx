import { useEffect, useContext, useState } from "react";
import APIClient from "../api/APIClient";
import Loading from "../components/loading/Loading";
import { ErrorContext } from "../contexts/ErrorContext";

const Authenticate = () => {
  const [apiClient] = useState(() => new APIClient());
  const { setError } = useContext(ErrorContext);
  const [prepareData, setPrepareData] = useState({ endpoint: "", payload: {} });

  useEffect(() => {
    apiClient.authenticateService
      .initializeReq({
        redirect_uri: `${process.env.REACT_APP_REDIRECT_URL}`,
        client_id: `${process.env.REACT_APP_CLIENT_ID}`,
        state: "svgnhTsbv&8sNu",
        response_mode: "query",
      })
      .then((res) => {
        setPrepareData({
          endpoint: res.data.endpoint,
          payload: res.data.payload,
        });
        console.log("Running");
      })
      .catch((err) => {
        setError(err);
        console.log(err.response.data);
      });
  }, [apiClient.authenticateService, setError]);

  useEffect(() => {
    console.log("preparing data");
    setTimeout(() => {
      console.log("form submission");
      try {
        if (
          document.getElementsByTagName("form")[0] &&
          prepareData.endpoint !== ""
        ) {
          document.getElementsByTagName("form")[0].submit();
          console.log("form submmitted");
        }
      } catch (err) {
        setError(err);
        console.log(err.response.data);
      }
    }, "5000");
  }, [setError, prepareData.endpoint]);

  return (
    <div>
      <Loading />
      {prepareData.endpoint && Object.keys(prepareData.payload).length > 0 && (
        <form method="GET" action={prepareData.endpoint}>
          <input
            type="hidden"
            name="client_id"
            defaultValue={prepareData.payload.client_id}
          />
          <input
            type="hidden"
            name="code_challenge"
            defaultValue={prepareData.payload.code_challenge}
          />
          <input
            type="hidden"
            name="nonce"
            defaultValue={prepareData.payload.nonce}
          />
          <input
            type="hidden"
            name="prompt"
            defaultValue={prepareData.payload.prompt}
          />
          <input
            type="hidden"
            name="redirect_uri"
            defaultValue={prepareData.payload.redirect_uri}
          />
          <input
            type="hidden"
            name="response_mode"
            defaultValue={prepareData.payload.response_mode}
          />
          <input
            type="hidden"
            name="response_type"
            defaultValue={prepareData.payload.response_type}
          />
          <input
            type="hidden"
            name="scope"
            defaultValue={prepareData.payload.scope}
          />
          <input
            type="hidden"
            name="state"
            defaultValue={prepareData.payload.state}
          />
        </form>
      )}
    </div>
  );
};

export default Authenticate;

import axios from "axios";
import AuthenticateService from "./AuthenticateService";
import EntityService from "./EntityService";
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";

class APIClient {
  DEVELOPMENT_API_BASE_URL =
    "http://os-ml10.eng.marklogic.com:8005/api/support-status-report";
  DEVELOPMENT_AUTH_BASE_URL = "http://localhost:3000/auth/reports/sessions";

  constructor() {
    const AuthAxiosInstance = axios.create({
      baseURL: this.DEVELOPMENT_AUTH_BASE_URL,
      withCredentials: true,
    });

    const APIAxiosInstance = axios.create({
      baseURL: this.DEVELOPMENT_API_BASE_URL,
      // withCredentials: true,
    });

    this.entityService = new EntityService(APIAxiosInstance);
    this.authenticateService = new AuthenticateService(AuthAxiosInstance);
  }
}

export default APIClient;

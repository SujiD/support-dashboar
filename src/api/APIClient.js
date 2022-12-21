import axios from "axios";
import AuthenticateService from "./AuthenticateService";
import EntityService from "./EntityService";
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";

class APIClient {
  DEVELOPMENT_AUTH_BASE_URL = "http://localhost:3000/auth/reports/sessions";
  API_BASE = process.env.REACT_APP_SUPPORT_API;
  AUTH_BASE =
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_AUTHORITY
      : this.DEVELOPMENT_AUTH_BASE_URL;

  constructor() {
    const AuthAxiosInstance = axios.create({
      baseURL: this.AUTH_BASE,
      withCredentials: true,
    });

    const APIAxiosInstance = axios.create({
      baseURL: this.API_BASE,
    });

    this.entityService = new EntityService(APIAxiosInstance);
    this.authenticateService = new AuthenticateService(AuthAxiosInstance);
  }
}

export default APIClient;

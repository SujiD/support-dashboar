import axios from "axios";
import AuthenticateService from "./AuthenticateService";
import EntityService from "./EntityService";

class APIClient {
  DEVELOPMENT_API_BASE_URL = "http://os-ml10.eng.marklogic.com/api";
  DEVELOPMENT_AUTH_BASE_URL = "http://os-ml10.eng.marklogic.com:8005/auth"

  constructor() {
    const AuthAxiosInstance = axios.create({
      baseURL: this.DEVELOPMENT_AUTH_BASE_URL,
      withCredentials: true,
    });
    const APIAxiosInstance = axios.create({
      baseURL: this.DEVELOPMENT_API_BASE_URL,
      // withCredentials: true,
    });
    // console.log(APIAxiosInstance)
    this.entityService = new EntityService(APIAxiosInstance);
    this.authenticateService = new AuthenticateService(AuthAxiosInstance);
  }
}

export default APIClient;

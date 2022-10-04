import axios from "axios";
import EntityService from "./EntityService";

class APIClient {
  DEVELOPMENT_BASE_URL = "http://os-ml10.eng.marklogic.com/api";

  constructor() {
    const APIAxiosInstance = axios.create({
      baseURL: this.DEVELOPMENT_BASE_URL,
    });
    this.entityService = new EntityService(APIAxiosInstance);
  }
}

export default APIClient;

import axios from "axios";
import HomeService from "./HomeService";

class APIClient {
    DEVELOPMENT_BASE_URL = "http://os-ml10.eng.marklogic.com/api";

    constructor(){
        const APIAxiosInstance = axios.create({
            baseURL: this.DEVELOPMENT_BASE_URL,
        });
        this.homeService = new HomeService(APIAxiosInstance);
    }
}

export default APIClient;
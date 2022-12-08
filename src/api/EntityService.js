import { headerConfig } from "../api/TokenHelpers";
class EntityService {
  constructor(axiosInstance) {
    this.axios = axiosInstance;
  }

  async getAllSearchData(reqBody) {
    try {
      return await this.axios.post(
        "/search",
        reqBody,
        // headerConfig(sessionStorage.getItem("token"))
      );
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async getTableFields() {
    try {
      return await this.axios.post(
        "/describe",
        {},
        headerConfig(sessionStorage.getItem("token"))
      );
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}

export default EntityService;

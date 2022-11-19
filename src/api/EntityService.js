class EntityService {
  constructor(axiosInstance) {
    this.axios = axiosInstance;
  }

  async getAllSearchData(reqBody) {
    try {
      return await this.axios.post("/support-status-report/search", reqBody);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async getTableFields() {
    try {
      return await this.axios.get(
        "http://os-ml10.eng.marklogic.com:8005/api/support-status-report/describe"
      );
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}

export default EntityService;

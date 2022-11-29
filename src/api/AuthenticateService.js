class AuthenticateService {
  constructor(axiosInstance) {
    this.axios = axiosInstance;
  }
  x;

  async initializeReq(reqBody) {
    try {
      return await this.axios.post("/reports/sessions/initialize", reqBody);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async sessionPrepare(reqBody) {
    try {
      return await this.axios.post(this.BASE_URL + "/prepare", reqBody);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async sessionAuthenticate(reqBody) {
    try {
      return await this.axios.post(this.BASE_URL + "/authentication", reqBody);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}

export default AuthenticateService;

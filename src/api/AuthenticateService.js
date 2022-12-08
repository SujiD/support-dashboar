class AuthenticateService {
  constructor(axiosInstance) {
    this.axios = axiosInstance;
  }

  async initializeReq(reqBody) {
    try {
      return await this.axios.post("/initialize", reqBody);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async sessionPrepare(reqBody) {
    try {
      return await this.axios.post("/prepare", reqBody);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async sessionAuthenticate(reqBody) {
    try {
      return await this.axios.post("/authentication", reqBody);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async refreshToken() {
    try {
      return await this.axios.post("/refreshtoken", {
        token: sessionStorage.getItem("token"),
        state: sessionStorage.getItem("state"),
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}

export default AuthenticateService;

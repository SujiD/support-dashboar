class EntityService {
  constructor(axiosInstance) {
    this.axios = axiosInstance;
  }

   async getAllSearchData(reqBody){
    try{
        return await this.axios.post(
            "/support-status-report/search",
            reqBody
        );

    }  catch(err){
        console.log(err);
        throw err;
    }
  }
}

export default EntityService;

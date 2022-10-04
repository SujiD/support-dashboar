class EntityService {
  constructor(axiosInstance) {
    this.axios = axiosInstance;
  }

   async getAllFacets(){
    try{
        return await this.axios.post(
            "/support-status-report/search",
            {
                appPath: "Report",
                q: "0ca72f154fc71e0bc6fa75772b925e7c-reportType:survey",
                start: "1",
                view: "all"
            }
        );

    }  catch(err){
        console.log(err);
        throw err;
    }
  }

  async getAllData(){
    try{
      return await this.axios.get(
          "/support-status-report/",
      );

  }  catch(err){
      console.log(err);
      throw err;
  }
  }
}

export default EntityService;

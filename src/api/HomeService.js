class HomeService {
  constructor(axiosInstance) {
    this.axios = axiosInstance;
  }

   getAllFacets(){
    try{
        return this.axios.post(
            "/support-status-report/search",
            {
                appPath: "Report",
                q: "0ca72f154fc71e0bc6fa75772b925e7c-reportType:survey",
                start: 1,
                view: "facets"
            }
        );

    }  catch(err){
        console.log(err);
        throw err;
    }
  }
}

export default HomeService;

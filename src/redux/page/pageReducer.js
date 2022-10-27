import pageTypes from "./pageTypes";
const initialState = {
  pageSize: 10,
};

export const pageReducer = (state = initialState, action) => {
  switch (action.type) {
    case pageTypes.FETCH_PAGEDATA_SUCCESS:
      return {
        pageSize: action.payload,
      };
    case pageTypes.UPDATE_PAGEDATA_PAGESIZE:
      return {
        pageSize: action.payload,
      };
    default: 
      return state;
  }
};

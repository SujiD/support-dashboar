import pageTypes from "./pageTypes";
const initialState = {
  pageSize: 10,
  totalLength: 0,
  numOfPages: 0,
  next: 1,
  prev: 1,
  start: 1,
};

export const pageReducer = (state = initialState, action) => {
  switch (action.type) {
    case pageTypes.FETCH_PAGEDATA_SUCCESS:
      return action.payload;
    case pageTypes.UPDATE_PAGEDATA_PAGESIZE:
      return action.payload;
    case pageTypes.UPDATE_PAGEDATA_NEXT_PREV:
      return action.payload;
    default:
      return state;
  }
};

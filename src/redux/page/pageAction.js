import pageTypes from "./pageTypes";

export const fetchPageDataSuccess = (pageSize) => {
  return {
    type: pageTypes.FETCH_PAGEDATA_SUCCESS,
    payload: pageSize,
  };
};

export const updatePageDataPageSize = (pageSize) => {
  return {
    type: pageTypes.UPDATE_PAGEDATA_PAGESIZE,
    payload: pageSize,
  };
};

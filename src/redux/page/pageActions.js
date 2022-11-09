import pageTypes from "./pageTypes";

export const fetchPageDataSuccess = (pageData) => {
  return {
    type: pageTypes.FETCH_PAGEDATA_SUCCESS,
    payload: pageData,
  };
};

export const updatePageDataPageSize = (pageData) => {
  return {
    type: pageTypes.UPDATE_PAGEDATA_PAGESIZE,
    payload: pageData,
  };
};

export const updatePageDataNextPrev = (pageData) => {
  return {
    type: pageTypes.UPDATE_PAGEDATA_NEXT_PREV,
    payload: pageData,
  };
};

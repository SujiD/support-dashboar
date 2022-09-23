import facetTypes from "./facetTypes";

//action creators
export const fetchFacetsReq = () => {
  return {
    type: facetTypes.FETCH_FACETS_REQUEST,
  };
};

export const fetchFacetsSuccess = () => {
  return {
    type: facetTypes.FETCH_FACETS_SUCCESS,
    payload: facets,
  };
};
export const fetchFacetsFailure = () => {
  return {
    type: facetTypes.FETCH_FACETS_FAILURE,
    payload: error,
  };
};

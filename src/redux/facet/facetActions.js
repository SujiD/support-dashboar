import facetTypes from "./facetTypes";
import { updateFacets } from "../../common/facetHelper";
//action creators
export const fetchFacetsReq = () => {
  return {
    type: facetTypes.FETCH_FACETS_REQUEST,
  };
};

export const fetchFacetsSuccess = (facets) => {
  return {
    type: facetTypes.FETCH_FACETS_SUCCESS,
    payload: facets,
  };
};

export const fetchFacetsUpdate = (facets) => {
  const outputFacetsData = {};
  const updatedFacets = updateFacets(outputFacetsData, facets.facets);
  facets.facets = updatedFacets;
  return {
    type: facetTypes.FETCH_FACETS_UPDATE,
    payload: facets,
  };
};

export const fetchFacetsFailure = (error) => {
  return {
    type: facetTypes.FETCH_FACETS_FAILURE,
    payload: error,
  };
};

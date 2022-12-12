import facetTypes from "./facetTypes";
import { updateFacets } from "../../common/FacetHelper";
//action creators

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

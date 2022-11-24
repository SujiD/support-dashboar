import { runtimeTypes } from "./runtimeTypes";
import { updateFacets } from "../../common/facetHelper";

export const fetchRuntimeReq = () => {
  return {
    type: runtimeTypes.FETCH_RUNTIME_REQUEST,
  };
};

export const fetchRuntimeSuccess = (results) => {
  return {
    type: runtimeTypes.FETCH_RUNTIME_SUCCESS,
    payload: results,
  };
};

export const fetchRuntimeUpdate = (results) => {
  const outputFacetsData = {};
  const updatedResults = updateFacets(outputFacetsData, results.facets);
  results.facets = updatedResults;
  return {
    type: runtimeTypes.FETCH_RUNTIME_UPDATE,
    payload: results,
  };
};

export const addRuntimeHiddenCols = (ColId) => {
  return {
    type: runtimeTypes.ADD_RUNTIME_HIDDENCOLS,
    payload: ColId,
  };
};

export const removeRuntimeHiddenCols = (ColId) => {
  return {
    type: runtimeTypes.REMOVE_RUNTIME_HIDDENCOLS,
    payload: ColId,
  };
};

export const toggleRuntimeSelect = (
  results,
  legendName,
  legendObj,
  facetId
) => {
  results.facets[facetId].values[legendName] = legendObj;
  return {
    type: runtimeTypes.TOGGLE_RUNTIME_SELECT,
    payload: results,
  };
};

export const fetchRuntimeFailure = (error) => {
  return {
    type: runtimeTypes.FETCH_RUNTIME_FAILURE,
    payload: error,
  };
};

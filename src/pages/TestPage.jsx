import { useState } from "react";
import Button from "react-bootstrap/Button";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchFacetsReq,
  fetchFacetsSuccess,
} from "../redux/facet/facetActions";
import APIClient from "../api/APIClient";
export const TestPage = () => {
  const facetState = useSelector((state) => {
    return {
      loading: state.facet.loading,
      facets: state.facet.facets,
      error: state.facet.error,
    };
  });
  const [apiClient] = useState(() => new APIClient());
  const dispatch = useDispatch();
  console.log(facetState);
  return (
    <>
      <div>Test Page</div>
      <div>{facetState.loading ? <div>True</div> : <div>False</div>}</div>
      {facetState.facets.length > 0 ? (
        <span>{facetState.facets[0]}</span>
      ) : (
        <div>Empty Array :( </div>
      )}
      <Button onClick={() => dispatch(fetchFacetsSuccess(["facets"]))}>
        Show Facets
      </Button>
    </>
  );
};

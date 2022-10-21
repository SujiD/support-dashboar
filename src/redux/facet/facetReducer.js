import facetTypes from "./facetTypes";
const initialState = {
  loading: false,
  facets: {},
  error: "",
};

export const facetReducer = (state = initialState, action) => {
  switch (action.type) {
    case facetTypes.FETCH_FACETS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case facetTypes.FETCH_FACETS_SUCCESS:
      return {
        loading: false,
        facets: action.payload,
        error: "",
      };
    case facetTypes.FETCH_FACETS_UPDATE:
      return {
        loading: false,
        facets: action.payload,
        error: "",
      };
      case facetTypes.TOGGLE_FACETS_SELECT:
      return {
        loading: false,
        facets: action.payload,
        error: "",
      };
    case facetTypes.FETCH_FACETS_FAILURE:
      return {
        loading: false,
        facets: {},
        error: action.payload,
      };
    default:
      return state;
  }
};

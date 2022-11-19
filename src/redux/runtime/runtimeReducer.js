import { runtimeTypes } from "./runtimeTypes";

const initialState = {
  initialResults: {},
  results: {},
  error: "",
};

export const runtimeReducer = (state = initialState, action) => {
  switch (action.type) {
    case runtimeTypes.FETCH_RUNTIME_REQUEST:
      return {
        ...state,
      };
    case runtimeTypes.FETCH_RUNTIME_SUCCESS:
      return {
        ...state,
        results: action.payload,
        initialResults:
          Object.keys(state.initialResults).length > 0
            ? state.initialResults
            : action.payload,
        error: "",
      };
    case runtimeTypes.FETCH_RUNTIME_UPDATE:
      return {
        ...state,
        results: action.payload,
        error: "",
      };
    case runtimeTypes.TOGGLE_RUNTIME_SELECT:
      return {
        ...state,
        results: action.payload,
        error: "",
      };
    case runtimeTypes.FETCH_RUNTIME_FAILURE:
      return {
        ...state,
        results: {},
        error: action.payload,
      };
    default:
      return state;
  }
};

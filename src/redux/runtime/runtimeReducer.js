import { runtimeTypes } from "./runtimeTypes";

const initialState = {
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
        results: action.payload,
        error: "",
      };
    case runtimeTypes.FETCH_RUNTIME_UPDATE:
      return {
        results: action.payload,
        error: "",
      };
    case runtimeTypes.TOGGLE_RUNTIME_SELECT:
      return {
        results: action.payload,
        error: "",
      };
    case runtimeTypes.FETCH_RUNTIME_FAILURE:
      return {
        results: {},
        error: action.payload,
      };
    default:
      return state;
  }
};

import { combineReducers } from "redux";
import { facetReducer } from "./facet/facetReducer";
import { pageReducer } from "./page/pageReducer";
import { runtimeReducer } from "./runtime/runtimeReducer";
const rootReducer = combineReducers({
  facet: facetReducer,
  pageData: pageReducer,
  runtime: runtimeReducer,
});

export default rootReducer;

import { combineReducers } from "redux";
import { facetReducer } from "./facet/facetReducer";
import { pageReducer } from "./page/pageReducer";
import { runtimeReducer } from "./runtime/runtimeReducer";
import { columnReducer } from "./column/columnReducer";

const rootReducer = combineReducers({
  facet: facetReducer,
  pageData: pageReducer,
  runtime: runtimeReducer,
  column: columnReducer,
});

export default rootReducer;

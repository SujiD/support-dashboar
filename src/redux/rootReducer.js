import { combineReducers } from "redux";
import { facetReducer } from "./facet/facetReducer";
import { pageReducer } from "./page/pageReducer";
const rootReducer = combineReducers({
  facet: facetReducer,
  pageData: pageReducer
});

export default rootReducer;

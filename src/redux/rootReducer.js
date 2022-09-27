import { combineReducers } from "redux";
import { facetReducer } from "./facet/facetReducer";

const rootReducer = combineReducers({ facet: facetReducer });

export default rootReducer;

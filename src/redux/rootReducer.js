import { combineReducers } from "redux";
import { facetReducer } from "./facet/facetReducer";
import { tableReducer } from "./tableMeta/tableReducer";
const rootReducer = combineReducers({
  facet: facetReducer,
  table: tableReducer,
});

export default rootReducer;

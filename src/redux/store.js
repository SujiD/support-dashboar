import { createStore } from "redux";
import { facetReducer } from "./facet/facetReducer";
//creation of store
const store = createStore(facetReducer);

export default store;
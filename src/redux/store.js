import { createStore, applyMiddleware } from "redux";
import rootReducer from "./rootReducer";
import thunk from 'redux-thunk';
//creation of store
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
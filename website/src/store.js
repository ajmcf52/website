import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import RootReducer from "./Reducers/RootReducer";
//need a rootReducer to import

const initState = {};

const middleware = [thunk];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

var store = createStore(
  RootReducer,
  initState,
  composeEnhancers(applyMiddleware(...middleware))
);

export default store;

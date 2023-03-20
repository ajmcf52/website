import { configureStore } from "@reduxjs/toolkit";

import RootReducer from "./reducers/RootReducer";

const initState = {};

var store = configureStore({
    reducer: RootReducer,
    devTools: window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__,
    preloadedState: initState,
});

export default store;

import { combineReducers } from "@reduxjs/toolkit";
import LoginReducer from "./LoginReducer";

export default combineReducers({
    login: LoginReducer,
});

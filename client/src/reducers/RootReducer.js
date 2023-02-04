import { combineReducers } from "@reduxjs/toolkit";
import LoginReducer from "./LoginReducer";
import ShoeReducer from "./ShoeReducer";

export default combineReducers({
    login: LoginReducer,
    shoe: ShoeReducer,
});

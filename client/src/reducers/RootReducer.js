import { combineReducers } from "@reduxjs/toolkit";
import LoginReducer from "./LoginReducer";
import ShoeReducer from "./ShoeReducer";
import CartReducer from "./CartReducer";

export default combineReducers({
    login: LoginReducer,
    shoe: ShoeReducer,
    cart: CartReducer,
});

import { combineReducers } from "@reduxjs/toolkit";
import LoginReducer from "./LoginReducer";
import ShoeReducer from "./ShoeReducer";
import CartReducer from "./CartReducer";
import DialogReducer from "./DialogReducer";
import ErrorReducer from "./ErrorReducer";

export default combineReducers({
    login: LoginReducer,
    shoe: ShoeReducer,
    cart: CartReducer,
    dialog: DialogReducer,
    error: ErrorReducer,
});

import { combineReducers } from "@reduxjs/toolkit";
import LoginReducer from "./LoginReducer";
import ShoeReducer from "./ShoeReducer";
import CartReducer from "./CartReducer";
import DialogReducer from "./DialogReducer";

export default combineReducers({
    login: LoginReducer,
    shoe: ShoeReducer,
    cart: CartReducer,
    dialog: DialogReducer,
});

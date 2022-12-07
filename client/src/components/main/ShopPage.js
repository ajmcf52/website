import React from "react";
import { useNavigate } from "react-router-dom";
import { createTheme } from "@mui/material/styles";
import { NavBar } from "./LandingPage";
import LoginButton from "../buttons/LoginButton";
import SignupButton from "../buttons/SignupButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const navShopBtnTheme = createTheme({
    palette: {
        primary: {
            main: "#deceaf",
            contrastText: "#4e0954",
        },
        secondary: {
            main: "#c26dc9",
            contrastText: "#665534",
        },
    },
});

export default function ShopPage() {
    let navigate = useNavigate();
    return (
        <div className="shop-root">
            <NavBar
                theme={navShopBtnTheme}
                buttons={[<LoginButton />, <SignupButton />]}></NavBar>
        </div>
    );
}

import React, { useEffect } from "react";
import axios from "../../api/axios";
import { connect } from "react-redux";
import { createTheme } from "@mui/material/styles";
import { NavBar } from "./LandingPage";
import { validateToken } from "../../utils/validateRefreshToken";
import LoginButton from "../buttons/LoginButton";
import SignupButton from "../buttons/SignupButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { LoginEventCreator } from "../../actions/LoginEvent";
import "./css/ShopPage.css";

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

/**
    in order to display the shoes that we have for sale,
    we will need to do the following:
    - make an API call that retrieves an array of tuples,
    where each tuple contains all the info required for a given shoe.
    the display square for each shoe requires:
    - the shoe name
    - the price
    - a picture

    For each shoe, the API call will return the shoe name, price, and picture URL.
    We will then put the URL into an <img> tag and go from there. This might need
    tweaking, but this is the approach we will go with for now.

    This is the basic premise of getting the shoes loaded in.

    Then, each of the pictures themselves should be clickable links (as well as the shoe name below).

    Clicking any given shoe link will take the user to a page detailing the specific info for that shoe,
    giving the user the option to select a size, as well as add 1 or more to their cart.

    */

const ShopPage = (props) => {
    const { isLoggedIn, firstName, accessToken } = props;

    useEffect(() => {
        const getShoes = async () => {
            while (true) {
                var reattempt = false;
                var success = false;
                try {
                    await axios
                        .get("/getAllShoes", {
                            headers: { "Content-Type": "application/json" },
                            withCredentials: true,
                        })
                        .then((res) => {
                            console.log(res.data);
                            success = true;
                        });
                } catch (error) {
                    if (error.response.status === 412) {
                        // if this pops, we need a new access token.
                    }
                    console.error("ERROR! --> ", error);
                    console.log("errtext --> ", error.response.data.errText);
                }
            }
        };

        getShoes();
    });

    return (
        <div className="shop-root">
            <div className="shop-page"></div>
            <NavBar
                theme={navShopBtnTheme}
                buttons={[<LoginButton />, <SignupButton />]}></NavBar>
            <header className="page-header">
                <h2 className="shop-header">Check these puppies out!</h2>
            </header>
            <div className="selection-container"></div>
        </div>
    );
};

const mapDispatchToProps = {
    triggerLogin: LoginEventCreator.login,
    triggerLogout: LoginEventCreator.logout,
};
const mapStateToProps = (state, props) => ({
    isLoggedIn: state && state.login && state.login.loggedIn,
    firstName: state && state.login && state.login.fname,
    accessToken: state && state.login && state.login.accessToken,
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);

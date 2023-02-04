import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { createTheme } from "@mui/material/styles";
import axios from "../../api/axios";
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
    const navigate = useNavigate();
    const { accessToken, email, isLoggedIn, triggerLogin } = props;

    useEffect(() => {
        const initLogin = async () => {
            if (isLoggedIn) return; // no need to send a request if we're already logged in.
            await axios
                .get("/refreshToken", {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                })
                .then((res) => {
                    if (res.data.renewedAccessToken !== undefined) {
                        triggerLogin({
                            email: res.data.email,
                            fname: res.data.fname,
                            accessToken: res.data.renewedAccessToken,
                        });
                    }
                })
                .catch((err) => {
                    console.log(err.response.data);
                    //navigate("/");
                });
        };
        const getShoes = async () => {
            console.log("AT --> ", accessToken);
            await axios
                .get("/getAllShoes", {
                    params: { email, at: accessToken },
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                })
                .then((res) => {
                    console.log("response data --> ", res.data);
                    props.shoeInfo = res.data.shoeInfo;
                })
                .catch((error) => {
                    console.log("HIGHIGHIHIGHGI -->> ", error.response);
                });
        };
        initLogin();
        getShoes();
    });
    console.log(props);
    return (
        <div className="shop-root">
            <div className="shop-page"></div>
            <NavBar
                theme={navShopBtnTheme}
                buttons={[<LoginButton />, <SignupButton />]}></NavBar>
            <header className="page-header">
                <h2 className="shop-header">Check these puppies out!</h2>
            </header>
            <div className="selection-container">
                {props.shoeInfo &&
                    props.shoeInfo.map((dataObj) => {
                        return <div className="shoe-container"></div>;
                    })}
            </div>
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
    email: state && state.login && state.login.email,
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);

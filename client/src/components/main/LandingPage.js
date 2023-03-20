import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { StyledButton } from "../buttons/styled/StyledButton";
import LoginButton from "../buttons/LoginButton";
import LogoutButton from "../buttons/LogoutButton";
import SignupButton from "../buttons/SignupButton";
import { LoginEventCreator } from "../../actions/LoginEvent";
import { validateToken } from "../../utils/validateRefreshToken";
import "./css/LandingPage.css";

const navBarBtnTheme = createTheme({
    palette: {
        primary: {
            main: "#4d3c32",
            contrastText: "#fff",
        },
        secondary: {
            main: "#8c6e5d",
            contrastText: "#c4957a",
        },
    },
});

const shopBtnTheme = createTheme({
    palette: {
        primary: {
            main: "#4d1846",
            contrastText: "#e8e5a9",
        },
        secondary: {
            main: "#75246b",
            contrastText: "#cc85c4",
        },
    },
});

export const NavBar = (props) => {
    const { theme, buttons } = props;
    return (
        <div key={"LandingPage"} className="main-nav">
            <ThemeProvider theme={theme}>
                <Stack direction="row" spacing={2} className="btn-stack">
                    {buttons.map((obj, i) => {
                        return (
                            <div className={obj.name} key={i}>
                                {obj}
                            </div>
                        );
                    })}
                </Stack>
            </ThemeProvider>
        </div>
    );
};

const LandingPage = (props) => {
    const isLoggedIn = props.isLoggedIn;
    const triggerLogin = props.triggerLogin;
    const triggerLogout = props.triggerLogout;
    const navigate = useNavigate();

    useEffect(() => {
        if (props.accessToken !== undefined) {
            // If we have an access token, this means our refresh token is valid.
            // Hence, no need to validate.
            return;
        }
        console.log("initializing LandingPage..");
        const initValidation = async () => {
            await validateToken(triggerLogin, isLoggedIn);
        };

        initValidation();
    });

    return (
        <div className="home-root">
            <NavBar
                theme={navBarBtnTheme}
                buttons={
                    props.isLoggedIn
                        ? [
                              <LogoutButton
                                  name="logout"
                                  triggerLogout={triggerLogout}
                              />,
                          ]
                        : [
                              <LoginButton name="login" />,
                              <SignupButton name="signup" />,
                          ]
                }
            />
            <div className="inner-root">
                <h1 className="shoester-h1">
                    Welcome to {<br />}
                    {props.isLoggedIn ? (
                        <div>
                            <span className="shoester-span">Shoester, </span>
                            <span className="shoester-span">
                                {props.firstName}!
                            </span>
                        </div>
                    ) : (
                        <span className="shoester-span">Shoester!</span>
                    )}
                </h1>
                <ThemeProvider theme={shopBtnTheme}>
                    <StyledButton
                        style={{ fontSize: "64px" }}
                        variant="contained"
                        color="primary"
                        className="shopBtn"
                        onClick={() => {
                            navigate("/shop");
                            //<Navigate to="/shop" replace={true} />;
                        }}>
                        Shop
                    </StyledButton>
                </ThemeProvider>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);

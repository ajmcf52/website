import React from "react";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import { Navigate } from "react-router-dom";
import { StyledButton } from "../buttons/styled/StyledButton";
import SignupButton from "../buttons/SignupButton";
import LoginButton from "../buttons/LoginButton";
import { setCacheCookie, getCacheCookie } from "../../utils/CacheCookie";
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

class LandingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: window.location.href,
        };
    }

    async componentDidMount() {
        let shoeCookie = await getCacheCookie(/^Shoester+=$/);
        if (shoeCookie === undefined) {
            axios.get("http://localhost:8000/addContext", {}).then((res) => {
                shoeCookie = res.data["sessionValue"];
                const expiry = res.data["sessionExpiry"];

                console.log("shoecookie --> ", shoeCookie);
                console.log("expiry --> ", expiry);
                setCacheCookie("Shoester", shoeCookie);
            });
        }
    }
    render() {
        return (
            <div className="home-root">
                <NavBar
                    theme={navBarBtnTheme}
                    buttons={[
                        <LoginButton name="login" />,
                        <SignupButton name="signup" />,
                    ]}
                />
                <div className="inner-root">
                    <h1 className="shoester-h1">
                        Welcome to {<br />}
                        <span className="shoester-span">Shoester!</span>
                    </h1>
                    <ThemeProvider theme={shopBtnTheme}>
                        <StyledButton
                            style={{ fontSize: "64px" }}
                            variant="contained"
                            color="primary"
                            className="shopBtn"
                            onClick={() => {
                                <Navigate to="/shop" replace={true} />;
                            }}>
                            Shop
                        </StyledButton>
                    </ThemeProvider>
                </div>
            </div>
        );
    }
}

export default LandingPage;

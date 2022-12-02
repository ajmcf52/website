import React from "react";
import {
    createTheme,
    ThemeProvider,
    styled,
    Theme,
} from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import "./css/LandingPage.css";

const navbarBtnTheme = createTheme({
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

export const StyledButton = styled(Button)(({ theme }) => ({
    maxHeight: "35px",
    border: "1px solid #8a7169",
    fontFamily: "Bebas Neue",
    "&:hover, &.Mui-focusVisible": {
        color: "#f0c8b1",
    },
    "&.Mui-active": {
        color: theme.palette.secondary.main,
    },
}));

export const NavBar = (props) => {
    const { theme } = props;
    let navigate = useNavigate();
    return (
        <div className="main-nav">
            <ThemeProvider theme={theme}>
                <Stack direction="row" spacing={2} className="btn-stack">
                    <StyledButton
                        color="primary"
                        className="btn btn-login"
                        variant="contained"
                        onClick={() => {
                            navigate("/login");
                        }}>
                        Login
                    </StyledButton>
                    <StyledButton
                        className="btn btn-register"
                        color="primary"
                        variant="contained"
                        onClick={() => {
                            navigate("/signup");
                        }}>
                        Register
                    </StyledButton>
                </Stack>
            </ThemeProvider>
        </div>
    );
};

export default function LandingPage() {
    let navigate = useNavigate();
    return (
        <div className="home-root">
            <NavBar theme={navbarBtnTheme} />
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
                            navigate("/shop");
                        }}>
                        Shop
                    </StyledButton>
                </ThemeProvider>
            </div>
        </div>
    );
}

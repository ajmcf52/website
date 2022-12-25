import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import {
    FormControlLabel,
    Checkbox,
    Typography,
    createStyles,
} from "@mui/material";
import BackButton from "../buttons/BackButton";
import { StyledField } from "../misc/StyledField";
import { LoginEventCreator } from "../../actions/LoginEvent";
import { withRouter } from "../../utils/withRouter";
import "./css/LoginForm.css";

const errorMsgStyle = (shouldDisplayError) =>
    createStyles({
        root: {
            display: shouldDisplayError ? "table" : "none",
            minHeight: "30px",
            minWidth: "100px",
        },
    });

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            showPassword: false,
            err: false,
            errtext: "",
        };
        this.navigateToLanding = this.navigateToLanding.bind(this);
    }

    handleChange = (evt) => {
        this.setState(() => ({
            [evt.target.name]: evt.target.value,
        }));
    };

    handleSubmit = (evt) => {
        evt.preventDefault();
        const { email, password } = this.state;
        axios
            .post("http://localhost:8000/login", { email, password })
            .then((res) => {
                this.setState({ err: false, errtext: "" });
                this.props.triggerLogin({
                    email: email,
                    fname: res.data.fname,
                });
                this.navigateToLanding();
            })
            .catch((error) => {
                console.log("Login Error! --> ", error);
                this.setState({
                    err: true,
                    errtext: error.response.data.errText,
                });
            });
    };

    navigateToLanding() {
        this.props.navigate("/");
    }

    render() {
        return (
            <div className="top-level">
                <BackButton className="back-btn" />
                <div className="form-container login-color">
                    <form
                        name="login"
                        method="post"
                        className="form-login shadow-layering"
                        action=""
                        encType="multipart/form-data"
                        onSubmit={this.handleSubmit}>
                        <h1 className="title">Login</h1>
                        <div className="input-container">
                            <StyledField
                                required
                                id="email-field"
                                className="field"
                                fullWidth
                                label="Email"
                                defaultValue=""
                                onChange={this.handleChange}
                                variant="outlined"
                                name="email"
                            />
                        </div>
                        <div className="input-container">
                            <StyledField
                                required
                                id="password-field"
                                className="field"
                                fullWidth
                                label="Password"
                                defaultValue=""
                                onChange={this.handleChange}
                                variant="outlined"
                                name="password"
                                type={
                                    this.state.showPassword
                                        ? "text"
                                        : "password"
                                }
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        size="small"
                                        disableRipple
                                        checked={this.state.showPassword}
                                        onChange={() => {
                                            this.setState((prevState) => ({
                                                showPassword:
                                                    !prevState.showPassword,
                                            }));
                                        }}
                                    />
                                }
                                label={
                                    <Typography
                                        style={{
                                            fontSize: "small",
                                            color: "grey",
                                            position: "relative",
                                            left: "8px",
                                        }}>
                                        Show Password
                                    </Typography>
                                }
                                className="show-pw-form-ctrl"
                                labelPlacement="start"
                            />
                        </div>
                        <div
                            className="error-msg"
                            style={errorMsgStyle(this.state.err).root}>
                            <Typography
                                className="css-ahj2mt-MuiTypography-root"
                                style={{
                                    fontSize: "small",
                                    color: "red",
                                    position: "relative",
                                    minHeight: "30px",
                                }}>
                                {this.state.errtext}
                            </Typography>
                        </div>
                        <input
                            type="submit"
                            className="submit-button"
                            value="Submit"></input>
                    </form>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = {
    triggerLogin: LoginEventCreator.login,
};

export default connect(null, mapDispatchToProps)(withRouter(LoginForm));

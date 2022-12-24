import React from "react";
import axios from "axios";
import BackButton from "../buttons/BackButton";
import { StyledField } from "../misc/StyledField";
import { FormControlLabel, Checkbox, Typography } from "@mui/material";
import "./css/LoginForm.css";

export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            showPassword: false,
        };
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
                console.log(res.data);
            });
    };

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

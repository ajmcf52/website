import React from "react";
import axios from "axios";
import { alpha, styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import PasswordChecklist from "react-password-checklist";
import "./css/SignupForm.css";
import { FormHelperText } from "@mui/material";

const emailRegex = /^\S+@\S+\.\S+$/;

const StyledField = styled(
    (
        props //TextFieldProps
    ) => <TextField {...props} />
)(({ theme }) => ({
    fontSize: "15px",
    maxHeight: "20px",
    "& .MuiFilledInput-root": {
        border: "1px solid #d6d6ce",
        overflow: "hidden",
        borderRadius: 4,
        backgroundColor: "#2b2b2b",
        transition: theme.transitions.create([
            "border-color",
            "background-color",
            "box-shadow",
        ]),
        "&:hover": {
            backgroundColor: "transparent",
        },
        "&.Mui-focused": {
            backgroundColor: "transparent",
            boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
            borderColor: "#a80ca6",
        },
    },
}));

export default class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fname: "",
            lname: "",
            email: "",
            password: "",
            passwordConfirm: "",
            passwordValid: true,
            emailError: false,
            emailSuccess: false,
            emailBlurred: false,
        };
    }

    handleBlur = (evt) => {
        if (evt.target.name === "email") {
            let email = evt.target.value;
            let isMatch = emailRegex.test(email);
            this.setState(() => ({
                emailError: email.length > 0 && !isMatch,
                emailSuccess: email.length > 0 && isMatch,
                emailBlurred: true,
            }));
        }
    };

    handleFocus = (evt) => {
        if (evt.target.name === "email") {
            this.setState(() => ({
                emailBlurred: false,
            }));
        }
    };

    handleChange = (evt) => {
        if (evt.target.name === "email") {
            // console.log("email value is --> " + evt.target.value);
            // console.log(evt.target.value.match(emailRegex));

            let email = evt.target.value;
            let isMatch = emailRegex.test(email);
            if (isMatch) {
                this.setState(() => ({
                    emailSuccess: true,
                    emailError: false,
                    email: evt.target.value,
                }));
            } else if (this.state.emailError) {
                this.setState(() => ({
                    email: evt.target.value,
                    emailError: false,
                    emailSuccess: false,
                }));
            }
        }

        // for non-email changes.
        else {
            this.setState(() => ({
                [evt.target.name]: evt.target.value,
            }));
        }
    };

    handleSubmit = (evt) => {
        evt.preventDefault();
        const { fname, lname, email, password } = this.state;
        const name = fname + " " + lname;
        axios
            .post("http://localhost:8000/signup", { name, email, password })
            .then((res) => {
                console.log(res);
                console.log(res.data);
            });
    };

    componentDidMount() {
        console.log("dood!");
    }

    render() {
        return (
            <div className="form-container">
                <form
                    name="sign-up"
                    method="post"
                    className="form-sign-up"
                    action=""
                    encType="multipart/form-data"
                    onSubmit={this.handleSubmit}>
                    <h1 className="title">Sign up</h1>

                    <div className="input-container name-field">
                        <StyledField
                            id="fname-field"
                            className="field"
                            fullWidth
                            label="First Name"
                            defaultValue={""}
                            onChange={this.handleChange}
                            variant="outlined"
                            name="fname"
                        />
                    </div>
                    <div className="input-container name-field">
                        <StyledField
                            id="lname-field"
                            className="field"
                            fullWidth
                            label="Last Name"
                            defaultValue={""}
                            onChange={this.handleChange}
                            variant="outlined"
                            name="lname"
                        />
                    </div>
                    <div className="input-container email-field">
                        <StyledField
                            id="email-field"
                            className="field"
                            fullWidth
                            label="Email"
                            defaultValue={""}
                            onChange={this.handleChange}
                            onBlur={this.handleBlur}
                            onFocus={this.handleFocus}
                            error={this.state.emailError}
                            color={
                                this.state.emailError
                                    ? "error"
                                    : this.state.emailSuccess
                                    ? "success"
                                    : !this.state.emailBlurred
                                    ? "secondary"
                                    : "primary"
                            }
                            variant="outlined"
                            name="email"
                            helperText={
                                this.state.emailError &&
                                this.state.email.length > 0
                                    ? "The email provided is invalid."
                                    : ""
                            }
                        />
                    </div>
                    <div className="input-container pw-field">
                        <StyledField
                            id="password-field"
                            className="field"
                            fullWidth
                            label="Password"
                            defaultValue=""
                            onChange={this.handleChange}
                            error={!this.state.pwValid}
                            variant="outlined"
                            name="password"
                            type="password"
                        />
                    </div>
                    <div className="input-container pw-confirm-field">
                        <StyledField
                            id="password-confirm-field"
                            className="field"
                            fullWidth
                            label="Confirm Password"
                            defaultValue=""
                            onChange={this.handleChange}
                            variant="outlined"
                            name="passwordConfirm"
                            type="password"
                        />
                    </div>
                    <PasswordChecklist
                        rules={[
                            "minLength",
                            "specialChar",
                            "number",
                            "capital",
                            "match",
                        ]}
                        minLength={2}
                        value={this.state.password}
                        valueAgain={this.state.passwordConfirm}
                        messages={{
                            minLength: "Contains more than 2 characters.",
                            specialChar:
                                "Contains one of the following: !#-_~&?$%*@.",
                            number: "Contains a number.",
                            capital: "Contains a capital letter.",
                            match: "Passwords match.",
                        }}
                    />
                    <input
                        type="submit"
                        className="submit-button"
                        value={"Submit"}></input>
                </form>
            </div>
        );
    }
}

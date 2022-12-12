import React from "react";
import axios from "axios";
import { alpha, styled } from "@mui/material/styles";
import {
    FormControlLabel,
    TextField,
    Checkbox,
    Typography,
} from "@mui/material";
import PasswordChecklist from "react-password-checklist";
import "./css/SignupForm.css";

const emailRegex = /^\S+@\S+\.\S+$/;
const pwRegex = /^[a-zA-Z0-9\-_~!@#$%^&*]{2,32}$/;
const pwIsValid = (pw, pwConfirm) => {
    return pwRegex.test(pw) && pw === pwConfirm;
};

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
            passwordSuccess: false,
            passwordError: false,
            passwordBlurred: false,
            emailError: false,
            emailSuccess: false,
            emailBlurred: false,
            showPassword: true,
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
        } else if (evt.target.name === "password") {
            let pw = evt.target.value;
            let pwValid = pwIsValid(
                this.state.password,
                this.state.passwordConfirm
            );
            this.setState(() => ({
                passwordBlurred: true,
                passwordSuccess: pwValid,
                passwordError: !pwValid,
            }));
        }
    };

    handleFocus = (evt) => {
        if (evt.target.name === "email") {
            this.setState(() => ({
                emailBlurred: false,
            }));
        } else if (evt.target.name === "password") {
            this.setState(() => ({
                passwordBlurred: false,
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
        } else if (
            evt.target.name === "password" ||
            evt.target.name === "passwordConfirm"
        ) {
            const pw =
                evt.target.name === "password"
                    ? evt.target.value
                    : this.state.password;
            const pwConfirm =
                evt.target.name === "passwordConfirm"
                    ? evt.target.value
                    : this.state.passwordConfirm;
            const isValid = pwIsValid(pw, pwConfirm);
            if (isValid) {
                this.setState(() => ({
                    passwordSuccess: true,
                    passwordError: false,
                    password: pw,
                    passwordConfirm: pwConfirm,
                }));
            } else {
                this.setState(() => ({
                    passwordSuccess: false,
                    passwordError: pw.length > 0 || pwConfirm.length > 0,
                    password: pw,
                    passwordConfirm: pwConfirm,
                }));
            }
        } else {
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
                            required
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
                            required
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
                            required
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
                            required
                            id="password-field"
                            className="field"
                            fullWidth
                            label="Password"
                            defaultValue=""
                            onChange={this.handleChange}
                            error={this.state.passwordError}
                            variant="outlined"
                            name="password"
                            type={this.state.showPassword ? "text" : "password"}
                        />
                    </div>
                    <div className="input-container pw-confirm-field">
                        <StyledField
                            required
                            id="password-confirm-field"
                            className="field"
                            fullWidth
                            label="Confirm Password"
                            defaultValue=""
                            onChange={this.handleChange}
                            error={this.state.passwordError}
                            variant="outlined"
                            name="passwordConfirm"
                            type="password"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    size="small"
                                    disableRipple
                                    checked={this.state.showPassword}
                                    onChange={(evt) => {
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

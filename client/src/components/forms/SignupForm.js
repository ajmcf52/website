import axios from "../../api/axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useRef, useState, useEffect } from "react";
import { StyledField } from "../misc/StyledField";
import { FormControlLabel, Checkbox, Typography, createStyles } from "@mui/material";
import PasswordChecklist from "react-password-checklist";
import { LoginEventCreator } from "../../actions/LoginEvent";
import BackButton from "../buttons/BackButton";
import "./css/SignupForm.css";

const EMAIL_REGEX = /^\S+@\S+\.\S+$/;
const PW_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[-_~!@#$%^&*]).{2,32}$/;

const submitButtonStyle = (isDisabled) =>
    createStyles({
        root: {
            display: "block",
            marginLeft: "auto",
            padding: "15px 30px",
            border: "none",
            backgroundColor: isDisabled ? "grey" : "purple",
            color: "white",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "16px",
            marginTop: "30px",
            position: "relative",
            top: "-55px",
            left: "-35px",
        },
    });

const pwErrorMsgStyle = (shouldDisplayError) =>
    createStyles({
        root: {
            display: shouldDisplayError ? "table" : "none",
            minHeight: "30px",
            minWidth: "100px",
            position: "relative",
            top: "-5px",
        },
    });

const SignupForm = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const fnameRef = useRef();
    const lnameRef = useRef();
    const emailRef = useRef();
    const errRef = useRef();

    const [fname, setFname] = useState("");
    const [fnameFocus, setFnameFocus] = useState(false);

    const [lname, setLname] = useState("");
    const [lnameFocus, setLnameFocus] = useState(false);

    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [pword, setPword] = useState("");
    const [validPword, setValidPword] = useState(false);
    const [pwordFocus, setPwordFocus] = useState(false);

    const [pwordConfirm, setPwordConfirm] = useState("");
    const [validPwordConfirm, setValidPwordConfirm] = useState(false);
    const [pwordConfirmFocus, setPwordConfirmFocus] = useState(false);

    const [errorText, setErrorText] = useState(" ");
    const [success, setSuccess] = useState(false);

    const [showPword, setShowPword] = useState(false);

    const [canSubmit, setCanSubmit] = useState(false);

    useEffect(() => {
        fnameRef.current.focus();
    }, []);

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email]);

    useEffect(() => {
        setValidPword(PW_REGEX.test(pword));
        setValidPwordConfirm(pword === pwordConfirm);
    }, [pword, pwordConfirm]);

    useEffect(() => {
        setErrorText(" ");
    }, [email, pword, pwordConfirm]);

    useEffect(() => {
        setCanSubmit(validEmail && validPword && validPwordConfirm);
    }, [validEmail, validPword, validPwordConfirm]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!EMAIL_REGEX.test(email) || !PW_REGEX.test(pword)) {
            setErrorText("Invalid Entry");
            return;
        }
        const name = fname + " " + lname;
        try {
            await axios
                .post(
                    "/signup",
                    {
                        name,
                        email,
                        pword,
                    },
                    {
                        headers: { "Content-Type": "application/json" },
                        withCredentials: true,
                    }
                )
                .then((res) => {
                    if (res !== undefined) {
                        console.log(res.data);
                        console.log("Signup Successful!!");
                        setSuccess(true);

                        // --- REDUX EVENT ---
                        dispatch(LoginEventCreator.login({ email, fname }));
                        navigate("/");
                    }
                });
        } catch (error) {
            console.log("Signup Error! --> ", error);
            setErrorText(error.response.data.errText);
        }
    };

    return (
        <div className="top-level">
            <BackButton className="back-btn" />
            <div className="form-container signup-color">
                <form
                    name="sign-up"
                    method="post"
                    className="form-sign-up shadow-layering"
                    action=""
                    encType="multipart/form-data"
                    onSubmit={handleSubmit}>
                    <h1 className="title">Sign up</h1>

                    <div ref={fnameRef} className="input-container name-field">
                        <StyledField
                            autoComplete="off"
                            required
                            id="fname-field"
                            className="field"
                            fullWidth
                            label="First Name"
                            defaultValue={""}
                            variant="outlined"
                            name="fname"
                            onChange={(e) => setFname(e.target.value)}
                            onFocus={() => setFnameFocus(true)}
                            onBlur={() => setFnameFocus(false)}
                        />
                    </div>
                    <div ref={lnameRef} className="input-container name-field">
                        <StyledField
                            autoComplete="off"
                            required
                            id="lname-field"
                            className="field"
                            fullWidth
                            label="Last Name"
                            defaultValue={""}
                            variant="outlined"
                            name="lname"
                            onChange={(e) => setLname(e.target.value)}
                            onFocus={() => setLnameFocus(true)}
                            onBlur={() => setLnameFocus(false)}
                        />
                    </div>
                    <div ref={emailRef} className="input-container email-field">
                        <StyledField
                            required
                            id="email-field"
                            className="field"
                            fullWidth
                            label="Email"
                            defaultValue={""}
                            onChange={(e) => setEmail(e.target.value)}
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
                            error={email.length > 0 && !validEmail}
                            color={emailFocus ? "secondary" : validEmail ? "success" : !validEmail ? "error" : "primary"}
                            variant="outlined"
                            name="email"
                            helperText={!validEmail && email.length > 0 ? "The email provided is invalid." : ""}
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
                            error={pword.length > 0 && !validPword && !pwordFocus}
                            variant="outlined"
                            name="password"
                            onChange={(e) => setPword(e.target.value)}
                            onFocus={() => setPwordFocus(true)}
                            onBlur={() => setPwordFocus(false)}
                            type={showPword ? "text" : "password"}
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
                            error={pwordConfirm.length > 0 && !validPwordConfirm && !pwordConfirmFocus}
                            variant="outlined"
                            name="passwordConfirm"
                            onChange={(e) => setPwordConfirm(e.target.value)}
                            onFocus={() => setPwordConfirmFocus(true)}
                            onBlur={() => setPwordConfirmFocus(false)}
                            type={showPword ? "text" : "password"}
                        />
                        <FormControlLabel
                            control={<Checkbox size="small" disableRipple checked={showPword} onChange={() => setShowPword(!showPword)} />}
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
                    <div className="error-msg" style={pwErrorMsgStyle(errorText !== " ").root}>
                        <Typography
                            ref={errRef}
                            className="css-ahj2mt-MuiTypography-root"
                            style={{
                                fontSize: "small",
                                color: "red",
                                position: "relative",
                                minHeight: "30px",
                            }}
                            aria-live="assertive">
                            {errorText}
                        </Typography>
                    </div>
                    <PasswordChecklist
                        className="pw-checklist"
                        rules={["minLength", "specialChar", "number", "capital", "match"]}
                        minLength={2}
                        value={pword}
                        valueAgain={pwordConfirm}
                        messages={{
                            minLength: "Contains more than 2 characters.",
                            specialChar: "Contains one of the following: !#-_~&?$%*@.",
                            number: "Contains a number.",
                            capital: "Contains a capital letter.",
                            match: "Passwords match.",
                        }}
                    />
                    <input
                        style={submitButtonStyle(!canSubmit).root}
                        type="submit"
                        disabled={!canSubmit}
                        className="submit-button"
                        value={"Submit"}></input>
                </form>
            </div>
        </div>
    );
};

export default SignupForm;

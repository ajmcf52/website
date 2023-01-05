import React, { useRef, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
    FormControlLabel,
    Checkbox,
    createStyles,
    Typography,
} from "@mui/material";
import { StyledField } from "../misc/StyledField";
import AuthContext from "../../context/AuthProvider";
import axios from "../../api/axios";
import "./css/LoginForm.css";

const errorMsgStyle = (shouldDisplayError) =>
    createStyles({
        root: {
            display: shouldDisplayError ? "table" : "none",
            minHeight: "30px",
            minWidth: "100px",
        },
    });

const LoginForm = () => {
    const navigate = useNavigate();
    const { setAuth } = useContext(AuthContext);
    const emailRef = useRef();
    const errorRef = useRef();

    const [email, setEmail] = useState("");
    const [pword, setPword] = useState("");
    const [errorText, setErrorText] = useState(" ");
    const [success, setSuccess] = useState(false);
    const [showPword, setShowPword] = useState(false);

    useEffect(() => {
        emailRef.current.focus();
    }, []);

    useEffect(() => {
        setErrorText(" ");
    }, [email, pword]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios
                .post(
                    "/login",
                    { email, pword },
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                        withCredentials: true,
                    }
                )
                .then((res) => {
                    console.log(JSON.stringify(res?.data));
                    const { accessToken, fname, email } = res.data;

                    setAuth({ email, pword, accessToken });
                });
            setEmail("");
            setPword("");
            setSuccess(true);
            navigate("/");
        } catch (error) {
            if (error?.res && error.res.data.errText) {
                setErrorText(error.res.data.errText);
            } else {
                setErrorText("Login Failed");
            }
            errorRef.current.focus();
        }
    };

    return (
        <section className="form-container login-color">
            <form
                name="login"
                method="post"
                className="form-login shadow-layering"
                action=""
                encType="multipart/form-data"
                onSubmit={handleSubmit}>
                <h1 className="title">Login</h1>
                <div ref={emailRef} className="input-container">
                    <StyledField
                        autoComplete="off"
                        required
                        id="email-field"
                        className="field"
                        fullWidth
                        label="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        variant="outlined"
                        name="email"
                        value={email}
                    />
                </div>
                <div className="input-container">
                    <StyledField
                        autoComplete="off"
                        required
                        id="password-field"
                        className="field"
                        fullWidth
                        label="Password"
                        value={pword}
                        onChange={(e) => setPword(e.target.value)}
                        variant="outlined"
                        name="password"
                        type={showPword ? "text" : "password"}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                size="small"
                                disableRipple
                                checked={showPword}
                                onChange={() => setShowPword(!showPword)}
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
                    style={errorMsgStyle(errorText !== " ").root}>
                    <Typography
                        ref={errorRef}
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
                <input
                    type="submit"
                    className="submit-button"
                    value="Submit"></input>
            </form>
        </section>
    );
};

export default LoginForm;

// import React from "react";
// import axios from "axios";
// import { connect } from "react-redux";

// import {
//     FormControlLabel,
//     Checkbox,
//     Typography,
//     createStyles,
// } from "@mui/material";
// import BackButton from "../buttons/BackButton";
// import { StyledField } from "../misc/StyledField";
// import { LoginEventCreator } from "../../actions/LoginEvent";
// import { withRouter } from "../../utils/withRouter";
// import "./css/LoginForm.css";

// const errorMsgStyle = (shouldDisplayError) =>
//     createStyles({
//         root: {
//             display: shouldDisplayError ? "table" : "none",
//             minHeight: "30px",
//             minWidth: "100px",
//         },
//     });

// class LoginForm extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             email: "",
//             password: "",
//             showPassword: false,
//             err: false,
//             errtext: "",
//         };
//         this.navigateToLanding = this.navigateToLanding.bind(this);
//     }

//     handleChange = (evt) => {
//         this.setState(() => ({
//             [evt.target.name]: evt.target.value,
//         }));
//     };

//     handleSubmit = (evt) => {
//         evt.preventDefault();
//         const { email, password } = this.state;
//         axios
//             .post("http://localhost:8000/login", { email, password })
//             .then((res) => {
//                 for (var header of res.headers) {
//                     console.log("HEADER --> ", header);
//                 }
//                 this.setState({ err: false, errtext: "" });
//                 this.props.triggerLogin({
//                     email: email,
//                     fname: res.data.fname,
//                 });
//                 this.navigateToLanding();
//             })
//             .catch((error) => {
//                 console.log("Login Error! --> ", error);
//                 this.setState({
//                     err: true,
//                     errtext: error.response.data.errText,
//                 });
//             });
//     };

//     navigateToLanding() {
//         this.props.navigate("/");
//     }

//     render() {
//         return (
//             <div className="top-level">
//                 <BackButton className="back-btn" />
//                 <div className="form-container login-color">
//                     <form
//                         name="login"
//                         method="post"
//                         className="form-login shadow-layering"
//                         action=""
//                         encType="multipart/form-data"
//                         onSubmit={this.handleSubmit}>
//                         <h1 className="title">Login</h1>
// <div className="input-container">
//     <StyledField
//         required
//         id="email-field"
//         className="field"
//         fullWidth
//         label="Email"
//         defaultValue=""
//         onChange={this.handleChange}
//         variant="outlined"
//         name="email"
//     />
// </div>
//                         <div
//                             className="error-msg"
//                             style={errorMsgStyle(this.state.err).root}>
//                             <Typography
//                                 className="css-ahj2mt-MuiTypography-root"
//                                 style={{
//                                     fontSize: "small",
//                                     color: "red",
//                                     position: "relative",
//                                     minHeight: "30px",
//                                 }}>
//                                 {this.state.errtext}
//                             </Typography>
//                         </div>
// <input
//     type="submit"
//     className="submit-button"
//     value="Submit"></input>
//                     </form>
//                 </div>
//             </div>
//         );
//     }
// }

// const mapDispatchToProps = {
//     triggerLogin: LoginEventCreator.login,
// };

// export default connect(null, mapDispatchToProps)(withRouter(LoginForm));

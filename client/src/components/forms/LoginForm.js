import React from "react";
import axios from "axios";
import BackButton from "../buttons/BackButton";
import "./css/LoginForm.css";
export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
        };
    }

    handleChange = (evt) => {
        console.log("value: " + evt.target.value);
        this.setState((prevState) => ({
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
                        className="form-login"
                        action=""
                        encType="multipart/form-data"
                        onSubmit={this.handleSubmit}>
                        <h1 className="title">Login</h1>
                        <div className="input-container">
                            <label className="input-label" htmlFor="email">
                                Email
                            </label>
                            <input
                                type="text"
                                id="email"
                                className="field"
                                defaultValue={""}
                                name="email"
                                placeholder="a"
                                onChange={this.handleChange}></input>
                        </div>
                        <div className="input-container">
                            <label className="input-label" htmlFor="password">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="field"
                                defaultValue={""}
                                name="password"
                                placeholder="a"
                                onChange={this.handleChange}></input>
                        </div>
                        <input
                            type="submit"
                            className="submit-button"
                            value="sign-up"></input>
                    </form>
                </div>
            </div>
        );
    }
}

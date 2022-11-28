import React, { useState } from "react";
import axios from "axios";

export default class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: "",
      lname: "",
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
    console.log("state is !!!: " + this.state);
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
          <div className="input-container">
            <label className="input-label" htmlFor="fname">
              First name
            </label>
            <input
              type="text"
              id="fname"
              className="field"
              defaultValue=""
              name="fname"
              placeholder="a"
              onChange={this.handleChange}></input>
          </div>
          <div className="input-container">
            <label className="input-label" htmlFor="lname">
              Last name
            </label>
            <input
              type="text"
              id="lname"
              className="field"
              defaultValue={""}
              name="lname"
              placeholder="a"
              onChange={this.handleChange}></input>
          </div>
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
    );
  }
}

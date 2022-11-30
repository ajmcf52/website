import React from "react";
import axios from "axios";
import { alpha, styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
// import "./SignupForm.css";

const StyledField = styled(
  (
    props //TextFieldProps
  ) => <TextField InputProps={{ disableUnderline: true }} {...props} />
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

          <div className="input-container">
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
          <div className="input-container">
            <StyledField
              id="email-field"
              className="field"
              fullWidth
              label="Email"
              defaultValue={""}
              onChange={this.handleChange}
              variant="outlined"
              name="email"
            />
          </div>
          <div className="input-container">
            <StyledField
              id="password-field"
              className="field"
              fullWidth
              label="Password"
              defaultValue=""
              onChange={this.handleChange}
              variant="outlined"
              name="password"
            />
            {/* <label className="input-label" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="field"
              defaultValue={""}
              name="password"
              placeholder="a"
              onChange={this.handleChange}></input> */}
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

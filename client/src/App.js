import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import SignupForm from "./components/SignupForm";
/**
 * Disclaimer(s):
 *
 * Sign-up form code was borrowed from a freecodecamp article.
 */

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  callAPI() {
    //axios.post();
  }

  //   componentDidMount() {
  //     this.callAPI();
  //   }

  render() {
    return (
      <div className="App">
        <SignupForm />
        <p>{this.state.apiResponse}</p>
      </div>
    );
  }
}

export default App;

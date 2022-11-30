import React, { Component, Suspense, lazy } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const Home = lazy(() => import("./components/main/Home"));
const SignupForm = lazy(() => import("./components/forms/SignupForm"));
const LoginForm = lazy(() => import("./components/forms/LoginForm"));

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
      <main>
        <Router>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/signup" element={<SignupForm />} />
              <Route element={Error} />
            </Routes>
          </Suspense>
        </Router>
      </main>
    );
  }
}

export default App;

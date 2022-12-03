import React, { Component, Suspense, lazy } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const LandingPage = lazy(() => import("./components/main/LandingPage"));
const SignupForm = lazy(() => import("./components/forms/SignupForm"));
const LoginForm = lazy(() => import("./components/forms/LoginForm"));
const ShopPage = lazy(() => import("./components/main/ShopPage"));

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { apiResponse: "" };
    }

    render() {
        return (
            <main>
                <Router>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Routes>
                            <Route path="/" element={<LandingPage />} />
                            <Route path="/login" element={<LoginForm />} />
                            <Route path="/signup" element={<SignupForm />} />
                            <Route path="/shop" element={<ShopPage />} />
                            <Route element={Error} />
                        </Routes>
                    </Suspense>
                </Router>
            </main>
        );
    }
}

export default App;

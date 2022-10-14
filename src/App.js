import React from "react";
import "./App.css";
import HomePage from "./Components/HomePage";
import { Provider } from "react-redux";

import store from "./store";

function App() {
  return (
    <div className="topLevel">
      <Provider store={store}>
        <div className="App">
          <HomePage />
        </div>
      </Provider>
    </div>
  );
}

export default App;

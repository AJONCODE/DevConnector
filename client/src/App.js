import React, { Component } from "react";

import AppNavbar from "./components/layout/AppNavbar";
import AppLanding from "./components/layout/AppLanding";
import AppFooter from "./components/layout/AppFooter";

import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppNavbar />
        <AppLanding />
        <AppFooter />
      </div>
    );
  }
}

export default App;

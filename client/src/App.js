import React, { Component } from "react";
import { Router } from "react-router-dom";

import browserHistory from "./browserHistory";
import AppNavbar from "./components/layout/AppNavbar";
import AppFooter from "./components/layout/AppFooter";
import routes from "./routes";

import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";

class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <div className="App">
          <AppNavbar />
          {routes}
          <AppFooter />
        </div>
      </Router>
    );
  }
}

export default App;

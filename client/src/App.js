import React, { Component } from "react";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import browserHistory from "./browserHistory";
import AppNavbar from "./components/layout/AppNavbar";
import AppFooter from "./components/layout/AppFooter";
import routes from "./routes";
import store from "./store";

// To check if user is already logged in
import jwtDecode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { clearCurrentProfile } from "./actions/profileActions";

import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";

// Check for token
if (localStorage.jwtToken) {
  // Set the auth token to header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and expiration
  const decoded = jwtDecode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout User (as a result Current User will be cleared)
    store.dispatch(logoutUser());
    // Clear Current Profile
    store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={browserHistory}>
          <div className="App">
            <AppNavbar />
            {routes}
            <AppFooter />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;

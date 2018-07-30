import React from "react";
import { Route, Switch } from "react-router-dom";

import AppLanding from "./components/layout/AppLanding";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/create-profile/CreateProfile";

import PrivateRoute from "./PrivateRoute";

const routes = (
  <div>
    <Switch>
      <Route exact path="/" component={AppLanding} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      <PrivateRoute exact path="/dashboard" component={Dashboard} />
      <PrivateRoute exact path="/create-profile" component={CreateProfile} />
    </Switch>
  </div>
);

export default routes;

import React from "react";
import { Route, Switch } from "react-router-dom";

import AppLanding from "./components/layout/AppLanding";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/create-profile/CreateProfile";
import EditProfile from "./components/edit-profile/EditProfile";
import AddExperience from "./components/add-credentials/AddExperience";
import AddEducation from "./components/add-credentials/AddEducation";

import PrivateRoute from "./PrivateRoute";

const routes = (
  <div>
    <Switch>
      <Route exact path="/" component={AppLanding} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      <PrivateRoute exact path="/dashboard" component={Dashboard} />
      <PrivateRoute exact path="/create-profile" component={CreateProfile} />
      <PrivateRoute exact path="/edit-profile" component={EditProfile} />
      <PrivateRoute exact path="/add-experience" component={AddExperience} />
      <PrivateRoute exact path="/add-education" component={AddEducation} />
    </Switch>
  </div>
);

export default routes;

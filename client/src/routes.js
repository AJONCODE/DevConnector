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
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import NotFound from "./components/not-found/NotFound";
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";

import PrivateRoute from "./PrivateRoute";

const routes = (
  <div>
    <Switch>
      <Route exact path="/" component={AppLanding} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/profiles" component={Profiles} />
      <Route exact path="/profile/:handle" component={Profile} />
      <Route exact path="/not-found" component={NotFound} />
      <PrivateRoute exact path="/dashboard" component={Dashboard} />
      <PrivateRoute exact path="/create-profile" component={CreateProfile} />
      <PrivateRoute exact path="/edit-profile" component={EditProfile} />
      <PrivateRoute exact path="/add-experience" component={AddExperience} />
      <PrivateRoute exact path="/add-education" component={AddEducation} />
      <PrivateRoute exact path="/feed" component={Posts} />
      <PrivateRoute exact path="/post/:_id" component={Post} />
    </Switch>
  </div>
);

export default routes;

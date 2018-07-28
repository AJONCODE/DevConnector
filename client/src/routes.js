import React from "react";
import { Route, Switch } from "react-router-dom";

import AppLanding from "./components/layout/AppLanding";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

const routes = (
  <div>
    <Switch>
      <Route exact path="/" component={AppLanding} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
    </Switch>
  </div>
);

export default routes;

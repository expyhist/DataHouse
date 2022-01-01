import React from "react";
import { Switch, Route, useRouteMatch, Redirect } from "react-router-dom";

import Login from "./Login";
import Register from "./Register";

const UserPage = () => {

  let { path } = useRouteMatch();

  return (
    <div>
      <Switch>
        <Route path={`${path}/login`} children={<Login />} />
        <Route path={`${path}/register`} children={<Register />} />
        <Redirect to="/users/login" />
      </Switch>
    </div>
  );
}

export default UserPage;
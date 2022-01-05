import React from "react";
import { Switch, Route, useRouteMatch, Redirect } from "react-router-dom";

import Login from "./Login";
import Register from "./Register";

const UserPage = (props) => {

  let { path } = useRouteMatch();

  return (
    <div>
      {
        localStorage.getItem("token") 
          ? <Redirect to={{ pathname: "/demands/list", state: { from: props.location } }} />
          : (
            <Switch>
              <Route path={`${path}/login`} children={<Login />} />
              <Route path={`${path}/register`} children={<Register />} />
              <Redirect to={`${path}/login`} /> 
            </Switch>
          )
      }
    </div>
  );
}

export default UserPage;
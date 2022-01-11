import React from 'react';
import {
  Switch, Route, useRouteMatch, Redirect,
} from 'react-router-dom';

import Login from './Login';
import Register from './Register';

function UserPage(props) {
  const { location } = props;
  const { path } = useRouteMatch();

  return (
    <div>
      {
        localStorage.getItem('token')
          ? <Redirect to={{ pathname: '/demands/list', state: { from: location } }} />
          : (
            <Switch>
              <Route path={`${path}/login`} component={() => <Login />} />
              <Route path={`${path}/register`} component={() => <Register />} />
              <Redirect to={`${path}/login`} />
            </Switch>
          )
      }
    </div>
  );
}

export default UserPage;

import React from 'react';
import {
  Switch, Route, useRouteMatch, Redirect,
} from 'react-router-dom';

import Login from './Login';
import Register from './Register';
import UsersLayout from './UsersLayout';

function UserPage({ location }) {
  const { path } = useRouteMatch();

  return (
    <div>
      {
        localStorage.getItem('token')
          ? <Redirect to={{ pathname: '/demands/list', state: { from: location } }} />
          : (
            <Switch>
              <Route path={`${path}/login`} component={() => <UsersLayout><Login /></UsersLayout>} />
              <Route path={`${path}/register`} component={() => <UsersLayout><Register /></UsersLayout>} />
              <Redirect to={`${path}/login`} />
            </Switch>
          )
      }
    </div>
  );
}

export default UserPage;

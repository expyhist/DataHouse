import React from 'react';
import {
  Switch, Route, useRouteMatch, Redirect,
} from 'react-router-dom';

import Login from './Login';
import Register from './Register';
import UserLayout from '@/layouts/UserLayout';

function UserPage({ location }) {
  const { path } = useRouteMatch();

  return (
    <div>
      {
        localStorage.getItem('token')
          ? <Redirect to={{ pathname: '/demands/list', state: { from: location } }} />
          : (
            <Switch>
              <Route path={`${path}/login`} component={() => <UserLayout><Login /></UserLayout>} />
              <Route path={`${path}/register`} component={() => <UserLayout><Register /></UserLayout>} />
              <Redirect to={`${path}/login`} />
            </Switch>
          )
      }
    </div>
  );
}

export default UserPage;

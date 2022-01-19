import React from 'react';
import {
  Switch, Route, useRouteMatch, Redirect,
} from 'react-router-dom';

import MenusList from './MenusList';
import UsersList from '../users/UsersList';

function SysConfigsPage() {
  const { path } = useRouteMatch();

  return (
    <div>
      <Switch>
        <Route path={`${path}/menuslist`} component={() => <MenusList />} />
        <Route path={`${path}/userslist`} component={() => <UsersList />} />
        <Redirect to={`${path}/menuslist`} />
      </Switch>
    </div>
  );
}

export default SysConfigsPage;

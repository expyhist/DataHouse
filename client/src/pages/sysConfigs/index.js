import React from 'react';
import {
  Switch, Route, useRouteMatch, Redirect,
} from 'react-router-dom';

import MenusList from './Menus/MenusList';
import UsersList from './Users/UsersList';
import RolesList from './Roles/RolesList';

function SysConfigsPage() {
  const { path } = useRouteMatch();

  return (
    <div>
      <Switch>
        <Route path={`${path}/menus/list`} component={() => <MenusList />} />
        <Route path={`${path}/users/list`} component={() => <UsersList />} />
        <Route path={`${path}/roles/list`} component={() => <RolesList />} />
        <Redirect to={`${path}/menus/list`} />
      </Switch>
    </div>
  );
}

export default SysConfigsPage;

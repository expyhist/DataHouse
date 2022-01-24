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
        <Route path={`${path}/menuslist`} component={() => <MenusList />} />
        <Route path={`${path}/userslist`} component={() => <UsersList />} />
        <Route path={`${path}/roleslist`} component={() => <RolesList />} />
        <Redirect to={`${path}/menuslist`} />
      </Switch>
    </div>
  );
}

export default SysConfigsPage;

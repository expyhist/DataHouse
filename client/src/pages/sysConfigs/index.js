import React from 'react';
import {
  Switch, Route, useRouteMatch, Redirect,
} from 'react-router-dom';

import MenusTree from './MenusTree';

function SysConfigsPage() {
  const { path } = useRouteMatch();

  return (
    <div>
      <Switch>
        <Route path={`${path}/menustree`} component={() => <MenusTree />} />
        <Redirect to={`${path}/menustree`} />
      </Switch>
    </div>
  );
}

export default SysConfigsPage;

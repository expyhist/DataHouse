import React from 'react';
import {
  Switch, Route, useRouteMatch, Redirect,
} from 'react-router-dom';

import ConfigsList from './Configs/ConfigsList';
import SingleConfig from './Configs/SingleConfig';
import ApiTable from './Tables';

function ApiTablesPage() {
  const { path } = useRouteMatch();

  return (
    <div>
      <Switch>
        <Route path={`${path}/configs/list`} component={() => <ConfigsList />} />
        <Route path={`${path}/configs/single/:id`} component={() => <SingleConfig />} />
        <Route path={`${path}/databoard/:id`} component={() => <ApiTable />} />
        <Redirect to={`${path}/configs/list`} />
      </Switch>
    </div>
  );
}

export default ApiTablesPage;

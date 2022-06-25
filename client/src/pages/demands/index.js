import React from 'react';
import {
  Switch, Route, useRouteMatch, Redirect,
} from 'react-router-dom';

import DemandsList from './DemandsList';
import AddDemand from './AddDemand';
import SingleDemand from './SingleDemand';

function DemandsPage() {
  const { path } = useRouteMatch();

  return (
    <div>
      <Switch>
        <Route path={`${path}/list`} component={() => <DemandsList />} />
        <Route path={`${path}/add`} component={() => <AddDemand />} />
        <Route path={`${path}/single/:id`} component={() => <SingleDemand />} />
        <Redirect to={`${path}/list`} />
      </Switch>
    </div>
  );
}

export default DemandsPage;

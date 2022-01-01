import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import DemandsList from "./DemandsList";
import SingleDemand from "./SingleDemand";

const DemandsPage = () => {

  const { path } = useRouteMatch();

  return (
    <div>
      <Switch>
        <Route path={`${path}/list`} children={<DemandsList />} />
        {/* <Route path={`${path}/single/:id`} children={<SingleDemand />} /> */}
      </Switch>
    </div>
  );
}

export default DemandsPage;
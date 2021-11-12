import React from "react";
import { Switch, Route, useRouteMatch, Redirect } from "react-router-dom";

import SiderMenu from "@/components/SiderMenu";
import DemandsList from "./DemandsList";
import SingleDemand from "./SingleDemand";

const DemandsPage = () => {

  const { path } = useRouteMatch();

  return (
    <div>
      <Switch>
        <Route exact path={`${path}`} children={<SiderMenu singlePath={`${path}`} />} />
        <Route path={`${path}/list`} children={<SiderMenu singlePath={`${path}`}><DemandsList /></SiderMenu>} />
        {/* <Route path={`${path}/single/:id`} children={<SiderMenu singlePath={`${path}`}><SingleDemand /></SiderMenu>} /> */}
      </Switch>
    </div>
  );
}

export default DemandsPage;
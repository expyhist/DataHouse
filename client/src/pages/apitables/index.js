import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import ConfigsList from "./Configs/ConfigsList";
import SingleConfig from "./Configs/SingleConfig";
import ApiTable from "./Tables";

const ApiTablesPage = () => {

  let { path } = useRouteMatch();

  return (
    <div>
      <Switch>
        <Route path={`${path}/configs/list`} children={<ConfigsList />} />
        <Route path={`${path}/configs/single/:id`} children={<SingleConfig />} />
        <Route path={`${path}/databoard/:id`} children={<ApiTable />} />
      </Switch>
    </div>
  );
}

export default ApiTablesPage;
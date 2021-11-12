import React from "react";
import { Switch, Route, useRouteMatch, Redirect } from "react-router-dom";

import SiderMenu from "@/components/SiderMenu";
import ConfigsList from "./Configs/ConfigsList";
import SingleConfig from "./Configs/SingleConfig";
import ApiTable from "./Tables";

const ApiTablesPage = () => {

  let { path } = useRouteMatch();

  return (
    <div>
      <Switch>
        <Route exact path={`${path}`} children={<SiderMenu singlePath={`${path}`}/>} />
        <Route path={`${path}/configs/list`} children={<SiderMenu singlePath={`${path}`}><ConfigsList /></SiderMenu>} />
        <Route path={`${path}/configs/single/:id`} children={<SiderMenu singlePath={`${path}`}><SingleConfig /></SiderMenu>} />
        <Route path={`${path}/databoard/:id`} children={<SiderMenu singlePath={`${path}`}><ApiTable /></SiderMenu>} />
      </Switch>
    </div>
  );
}

export default ApiTablesPage;
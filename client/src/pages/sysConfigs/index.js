import React from "react";
import { Switch, Route, useRouteMatch, Redirect } from "react-router-dom";

import SiderMenu from "@/components/SiderMenu";
import MenusTree from "./MenusTree";

const SysConfigsPage = () => {

  const { path } = useRouteMatch();

  return (
    <div>
      <Switch>
        <Route exact path={`${path}`} children={<SiderMenu singlePath={`${path}`} />} />
        <Route path={`${path}/menustree`} children={<SiderMenu singlePath={`${path}`}><MenusTree /></SiderMenu>} />
      </Switch>
    </div>
  );
}

export default SysConfigsPage;
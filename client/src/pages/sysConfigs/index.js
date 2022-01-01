import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import MenusTree from "./MenusTree";

const SysConfigsPage = () => {

  const { path } = useRouteMatch();

  return (
    <div>
      <Switch>
        <Route path={`${path}/menustree`} children={<MenusTree />} />
      </Switch>
    </div>
  );
}

export default SysConfigsPage;
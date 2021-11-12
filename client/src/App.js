import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import Header from "./components/Header";
import DemandsPage from "@/pages/demands";
import ApiTablesPage from "@/pages/apitables";
import SysConfigsPage from "@/pages/sysConfigs";

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route path="/demands" children={<DemandsPage />} />
          <Route path="/tables" children={<ApiTablesPage />} />
          <Route path="/sysconfigs" children={<SysConfigsPage />} />
          <Redirect to="/demands" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
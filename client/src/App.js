import React from 'react';
import {
  BrowserRouter as Router, Switch, Route, Redirect,
} from 'react-router-dom';

import PrivateRoute from '@/utils/PrivateRoute';
import PrivateLayout from '@/components/PrivateLayout';
import DemandsPage from './pages/demands';
import ApiTablesPage from './pages/apitables';
import SysConfigsPage from './pages/sysConfigs';
import UsersPage from './pages/users';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/users" component={() => <UsersPage />} />
          <PrivateRoute path="/demands" component={() => <PrivateLayout><DemandsPage /></PrivateLayout>} />
          <PrivateRoute path="/tables" component={() => <PrivateLayout><ApiTablesPage /></PrivateLayout>} />
          <PrivateRoute path="/sysconfigs" component={() => <PrivateLayout><SysConfigsPage /></PrivateLayout>} />
          <Redirect to="/users" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

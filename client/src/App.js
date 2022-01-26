import React, {
  Suspense, lazy,
} from 'react';
import {
  BrowserRouter as Router, Switch, Route, Redirect,
} from 'react-router-dom';

import { useAccess } from '@/utils/useAccess';
import AccessProvider from '@/utils/AccessContext';

const PrivateRoute = lazy(() => import('@/utils/PrivateRoute'));
const PrivateLayout = lazy(() => import('@/layouts/PrivateLayout'));
const DemandsPage = lazy(() => import('./pages/demands'));
const ApiTablesPage = lazy(() => import('./pages/apitables'));
const SysConfigsPage = lazy(() => import('./pages/sysConfigs'));
const UsersPage = lazy(() => import('./pages/users'));

function App() {
  const access = useAccess();
  return (
    <AccessProvider access={access}>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route path="/users" component={() => <UsersPage />} />
            <PrivateRoute path="/demands" component={() => <PrivateLayout><DemandsPage /></PrivateLayout>} />
            <PrivateRoute path="/tables" component={() => <PrivateLayout><ApiTablesPage /></PrivateLayout>} />
            <PrivateRoute path="/sysconfigs" component={() => <PrivateLayout><SysConfigsPage /></PrivateLayout>} />
            <Redirect to="/users" />
          </Switch>
        </Suspense>
      </Router>
    </AccessProvider>
  );
}

export default App;

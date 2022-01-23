import React, {
  Suspense, lazy, useState, useEffect,
} from 'react';
import {
  BrowserRouter as Router, Switch, Route, Redirect,
} from 'react-router-dom';

import { AccessContext, useAccess } from '@/utils/useAccess';

const PrivateRoute = lazy(() => import('@/utils/PrivateRoute'));
const PrivateLayout = lazy(() => import('@/components/PrivateLayout'));
const DemandsPage = lazy(() => import('./pages/demands'));
const ApiTablesPage = lazy(() => import('./pages/apitables'));
const SysConfigsPage = lazy(() => import('./pages/sysConfigs'));
const UsersPage = lazy(() => import('./pages/users'));

function App() {
  const [access, setAccess] = useState({});

  useEffect(() => {
    const getAccess = async () => {
      const result = await useAccess();
      setAccess(result);
    };
    getAccess();
  }, []);

  return (
    <AccessContext.Provider value={access}>
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
    </AccessContext.Provider>
  );
}

export default App;

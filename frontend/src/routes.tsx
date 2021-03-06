import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import RegisterBikePage from './pages/RegisterBikePage/RegisterBikePage';
import SearchPage from './pages/SearchPage/SearchPage';
import DashboardPage from './pages/Dashboard/Dashboard';
import Protected from './components/Protected';
import HomePage from './pages/HomePage/HomePage';

const AppRoutes: React.FunctionComponent = () => (
  <Switch>
    <Route path="/" exact={true} component={HomePage} />
    <Route path="/search/:bikeId" component={SearchPage} />
    <Route path="/search" component={SearchPage} />
    <Route exact={true} path="/dashboard/register">
      <Protected>
        <RegisterBikePage />
      </Protected>
    </Route>
    <Route path="/dashboard">
      <Protected>
        <DashboardPage />
      </Protected>
    </Route>
  </Switch>
);

export default AppRoutes;

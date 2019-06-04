import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import RegisterBikePage from './pages/RegisterBikePage/RegisterBikePage';
import SearchPage from './pages/SearchPage/SearchPage';
import DashboardPage from './pages/Dashboard/Dashboard';
import Protected from './components/Protected';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';

const AppRoutes: React.FunctionComponent = () => (
  <Switch>
    <Route path="/" exact={true} component={HomePage} />
    <Route path="/login" component={LoginPage} />
    <Route path="/search/:bikeId" component={SearchPage} />
    <Route path="/search" component={SearchPage} />
    <Route exact={true} path="/dashboard/register">
      <Protected currentLocation="/register">
        <RegisterBikePage />
      </Protected>
    </Route>
    <Route path="/dashboard">
      <Protected currentLocation="/dashboard">
        <DashboardPage />
      </Protected>
    </Route>
  </Switch>
);

export default AppRoutes;

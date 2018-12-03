import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';

import AppToolbar from './components/AppToolbar/AppToolbar';
import RegisterBikePage from './pages/RegisterBikePage/RegisterBikePage';
import SearchPage from './pages/SearchPage/SearchPage';
import DashboardPage from './pages/Dashboard/Dashboard';
import Protected from './components/Protected';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <AppToolbar
          appTitle={'Bike Bank'}
        />
        <Switch>
          <Route path="/search" component={SearchPage} />
          <Route path="/dashboard"><Protected><RegisterBikePage /></Protected></Route>
          <Route path="/dashboard"><Protected><DashboardPage /></Protected></Route>
        </Switch>
      </div>
    );
  }
}

export default App;

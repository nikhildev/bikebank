import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';

import './App.css';

import AppToolbar from './components/AppToolbar/AppToolbar';
import RegisterBikePage from './containers/RegisterBikePage/RegisterBikePage';
import SearchPage from './containers/SearchPage/SearchPage';

class App extends React.Component {
  public render() {
    return (
      <BrowserRouter>
        <div className="App">
          <AppToolbar
            appTitle={'Bike Bank'}
          />
          <SearchPage />
          <RegisterBikePage />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';

import './App.css';

import AppToolbar from './components/AppToolbar/AppToolbar';
import SearchPage from "./containers/SearchPage/SearchPage";

class App extends React.Component {
  public render() {
    return (
      <BrowserRouter>
        <div className="App">
          <AppToolbar
            appTitle={'Bike Bank'}
          />
          <SearchPage />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

import * as React from 'react';
import './App.css';

import AppToolbar from './components/AppToolbar';
import SearchPage from "./containers/SearchPage/SearchPage";

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <AppToolbar
          appTitle={'Bike Bank'}/>
        <SearchPage />
      </div>
    );
  }
}

export default App;

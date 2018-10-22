import * as React from 'react';
import './App.css';

import SearchPage from "./containers/SearchPage/SearchPage";

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <h1>Bike Bank</h1>
        <SearchPage />
      </div>
    );
  }
}

export default App;

import * as React from 'react';

import './App.css';
import AppRoutes from './routes';

import AppToolbar from './components/AppToolbar/AppToolbar';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <AppToolbar appTitle={'Bike Bank'} />
        <AppRoutes />
      </div>
    );
  }
}

export default App;

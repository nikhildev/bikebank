// @flow

import React, { Component } from 'react';
import './App.css';

type DefaultProps = {
  appTitle: String,
  appVersion: String,
};

type Props = {
  appTitle: string,
  appVersion: string,
};

type State = {
  appTitle: String,
  appVersion: String,
};

class App extends Component<DefaultProps, Props, State> {

  constructor(props: Props, context: any) {
    super(props, context);
    console.log(this.props.appTitle);
  }
  
  render() {
    return (
      <div className="App">
        <header>
          <h1>App</h1>
          <input type="text"/>
        </header>
      </div>
    );
  }
}

export default App;

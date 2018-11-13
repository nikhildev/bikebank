import * as React from 'react';
import {
  Link,
} from 'react-router-dom';

import './AppToolbar.css';

interface IProps {
  appTitle: string,
}

class AppToolbar extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  public render() {
    return (
      <div id="AppToolbar">
        <div id="AppTitle">{this.props.appTitle}</div>
        <nav id="AppNavBar">
          <Link
            to="/"
            className={'active'}
          >
            Home
          </Link>
          <Link to="/">Dashboard</Link>
        </nav>
        <div id="ToolbarActions">
          <Link
            id="AppToolbarLoginButton"
            to="/"
          >
            Login
          </Link>
        </div>
      </div>
    )
  }
}

export default AppToolbar;
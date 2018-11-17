import * as React from 'react';
import { NavLink } from 'react-router-dom';

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
          <NavLink exact={true} to="/" activeClassName="active">Home</NavLink>
          <NavLink to="/search" activeClassName="active">Search</NavLink>
          <NavLink to="/dashboard" activeClassName="active">Dashboard</NavLink>
        </nav>
        <div id="ToolbarActions">
          <NavLink id="AppToolbarLoginButton" to="/login">Login</NavLink>
        </div>
      </div>
    )
  }
}

export default AppToolbar;
import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import './AppToolbar.css';
import { User } from '../../types/user';
import { login, logout } from '../../lib/firebase';

interface IProps {
  appTitle: string,
  user: User | boolean;
}

interface IState {
  user: User | false;
}

class AppToolbar extends React.Component<IProps, IState> {
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
          {this.props.user
            ? <button onClick={logout}>Logout</button>
            : <button onClick={login}>Login</button>
          }
        </div>
      </div>
    )
  }
}

function mapStateToProps(state: IState): IState {
  return {
    user: state.user || false,
  };
}

export default connect(mapStateToProps, null) (AppToolbar);
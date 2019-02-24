import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import './AppToolbar.css';
import { User } from '../../types/user';
import { login, logout } from '../../lib/firebase';
import Avatar from '../Core/Avatar';

interface IProps {
  appTitle: string,
  user: User;
}

interface IState {
  user: User;
}

class AppToolbar extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  private handleLoginClick = async () => {
    await login();
  }

  private handleLogoutClick = async () => {
    await logout();
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
            ? <div onClick={this.handleLogoutClick}>
                <Avatar
                  user={this.props.user}
                />
              </div>
            : <button onClick={this.handleLoginClick}>Login</button>
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

export default connect<IState>(mapStateToProps, {}) (AppToolbar);
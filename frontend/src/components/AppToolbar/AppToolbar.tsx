import * as React from 'react';
import { Dispatch } from 'redux';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { ReduxActionTypes } from '../../types/redux';
// import { RouteComponentProps } from 'react-router'

import './AppToolbar.css';
import { User } from '../../types/user';
import { login, logout } from '../../lib/firebase';
import Avatar from '../Core/Avatar';

interface IProps {
  appTitle: string,
  user: User;
}

interface IDispatchProps {
  dispatchLogin: Function,
  dispatchLogout: Function,
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

const mapDispatchToProps: any = (dispatch: Dispatch) => ({
  dispatchLogin: () => dispatch({
    type: ReduxActionTypes.AUTHENTICATED,
  }),
  dispatchLogout: () => dispatch({
    type: ReduxActionTypes.UNAUTHENTICATED,
  }),
});

export default connect<IState, IDispatchProps>(mapStateToProps, mapDispatchToProps) (AppToolbar);
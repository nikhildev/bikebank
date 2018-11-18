import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './AppToolbar.css';
import { User } from '../../types/user';

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
    console.log(this.props);

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
            ? <button>Logout</button>
            : <button>Login</button>
          }
          {/* <NavLink id="AppToolbarLoginButton" to="/login">Login</NavLink> */}
          {/* <button onClick={this.handleLogin} /> */}
        </div>
      </div>
    )
  }

  // private handleLogin = () => {
  //   console.log(3);
  // }
}

function mapStateToProps(state: IState): IState {
  return {
    user: state.user || false,
  };
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({
    // setLoginSuccess,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps) (AppToolbar);
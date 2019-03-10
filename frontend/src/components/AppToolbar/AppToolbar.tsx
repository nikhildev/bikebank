import * as React from 'react';
// import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Avatar from '@material-ui/core/Avatar';

import './AppToolbar.css';
import { User } from '../../types/user';
import { login, logout } from '../../lib/firebase';

interface IProps {
  appTitle: string;
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
  };

  private handleLogoutClick = async () => {
    await logout();
  };

  public render() {
    return (
      <div id="AppTooldbar">
        <AppBar position="static">
          <Toolbar>
            <IconButton color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" style={{ flexGrow: 1 }}>
              Bike Bank
            </Typography>
            {this.props.user ? (
              <div onClick={this.handleLogoutClick}>
                <Avatar alt="User Name" src={this.props.user.photoUrl || ''} />
                {/* <Avatar user={this.props.user} /> */}
              </div>
            ) : (
              // <button onClick={this.handleLoginClick}>Login</button>
              <Button onClick={this.handleLoginClick} color="inherit">
                Login
              </Button>
            )}
          </Toolbar>
        </AppBar>
        <div id="AppTitle">{this.props.appTitle}</div>
      </div>
    );
  }
}

function mapStateToProps(state: IState): IState {
  return {
    user: state.user || false,
  };
}

export default connect<IState>(
  mapStateToProps,
  {},
)(AppToolbar);

import * as React from 'react';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Avatar from '@material-ui/core/Avatar';

import './AppToolbar.css';
import { IUserDispatchProps } from '../../types/user';
import { requestUserLogin, requestUserLogout } from 'src/actions/user';

interface IProps {
  appTitle: string;
}

interface IMappedDispatchProps {
  requestUserLogin: Function;
  requestUserLogout: Function;
}

interface IMappedStateProps {
  user: IUserDispatchProps;
}

class AppToolbar extends React.Component<
  IMappedDispatchProps & IMappedStateProps & IProps
> {
  private handleLoginClick = async () => {
    this.props.requestUserLogin();
  };

  private handleLogoutClick = async () => {
    this.props.requestUserLogout();
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
            {this.props.user.user ? (
              <div onClick={this.handleLogoutClick}>
                <Avatar
                  alt="User Name"
                  src={this.props.user.user.photoUrl || ''}
                />
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

function mapStateToProps(state: IMappedStateProps): IMappedStateProps {
  return {
    user: state.user || false,
  };
}

const mapDispatchToProps: IMappedDispatchProps = {
  requestUserLogin,
  requestUserLogout,
};

export default connect<IMappedStateProps, IMappedDispatchProps>(
  mapStateToProps,
  mapDispatchToProps,
)(AppToolbar);

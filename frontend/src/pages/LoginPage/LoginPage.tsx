import * as React from 'react';
import { connect } from 'react-redux';

import { UserDispatchProps } from '../../types/user';
import { requestUserLogin, AuthProvider } from '../../actions/user';

interface MappedDispatchProps {
  requestUserLogin: Function;
}

interface MappedStateProps {
  user: UserDispatchProps;
}

class LoginPage extends React.Component<MappedStateProps & MappedDispatchProps> {
  handleGoogleLoginClick = () => {
    this.props.requestUserLogin(AuthProvider.Google);
  };

  handleFacebookLoginClick = () => {
    this.props.requestUserLogin(AuthProvider.Facebook);
  };

  public render() {
    if (this.props.user.isFetching) {
      return (
        <main>
          <div className="spinner-border" role="status">
            <span className="sr-only">Logging you in...</span>
          </div>
        </main>
      );
    } else {
      return (
        <main className="container-fluid h-100">
          <div className="jumbotron">
            <h1 className="display-4">Log In</h1>
            <p className="lead">
              We do not save any of your personal information. Please authenticate yourself using
              one of the providers below
            </p>
            <p className="lead">
              <button className="btn btn-primary m-1" onClick={this.handleGoogleLoginClick}>
                Sign in with Google
              </button>
              <button className="btn btn-primary m-1" onClick={this.handleFacebookLoginClick}>
                Log in with Facebook
              </button>
            </p>
          </div>
        </main>
      );
    }
  }
}

function mapStateToProps(state: MappedStateProps): MappedStateProps {
  return {
    user: state.user || false,
  };
}

const mapDispatchToProps: MappedDispatchProps = {
  requestUserLogin,
};

export default connect<MappedStateProps, MappedDispatchProps>(
  mapStateToProps,
  mapDispatchToProps,
)(LoginPage);

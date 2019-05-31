import * as React from 'react';
import { connect } from 'react-redux';

import { UserDispatchProps } from '../types/user';
import { requestUserLogin, AuthProvider } from '../actions/user';

interface MappedDispatchProps {
  requestUserLogin: Function;
}

interface MappedStateProps {
  user: UserDispatchProps;
}

class Protected extends React.Component<MappedStateProps & MappedDispatchProps> {
  handleGoogleLoginClick = () => {
    this.props.requestUserLogin(AuthProvider.Google);
  };

  handleFacebookLoginClick = () => {
    this.props.requestUserLogin(AuthProvider.Facebook);
  };

  public render() {
    if (this.props.user.isFetching) {
      return <main>Signing you into your account</main>;
    } else if (this.props.user.user) {
      return <main>{this.props.children}</main>;
    } else {
      return (
        <main className="container-fluid h-100">
          <div className="card p-3 m-3 align-middle">
            <h3>Please login to access your dashboard</h3>
            <div className="row">
              <button className="col-md my-2 btn btn-primary" onClick={this.handleGoogleLoginClick}>
                Sign in with Google
              </button>
              <button
                className="col-md my-2 btn btn-primary"
                onClick={this.handleFacebookLoginClick}
              >
                Log in with Facebook
              </button>
            </div>
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
)(Protected);

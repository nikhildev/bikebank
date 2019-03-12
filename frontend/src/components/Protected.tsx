import * as React from 'react';
import { connect } from 'react-redux';

import { UserDispatchProps } from '../types/user';
import * as signinImage from '../assets/images/signin_with_google.png';
import { requestUserLogin, AuthProvider } from 'src/actions/user';

interface MappedDispatchProps {
  requestUserLogin: Function;
}

interface MappedStateProps {
  user: UserDispatchProps;
}

class Protected extends React.Component<
  MappedStateProps & MappedDispatchProps
> {
  handleGoogleLoginClick = () => {
    this.props.requestUserLogin(AuthProvider.Google);
  };

  handleFacebookLoginClick = () => {
    this.props.requestUserLogin(AuthProvider.Facebook);
  };

  public render() {
    console.log(this.props.user);

    if (this.props.user.isFetching) {
      return <main>Signing you into your account</main>;
    } else if (this.props.user.user) {
      return <main>{this.props.children}</main>;
    } else {
      return (
        <main
          style={{
            textAlign: 'center',
          }}
        >
          <h1>Please login to access your dashboard</h1>
          <img
            src={signinImage}
            alt=""
            height="52"
            onClick={this.handleGoogleLoginClick}
          />
          <img
            src="https://i.stack.imgur.com/Vk9SO.png"
            alt="Login with Facebook"
            onClick={this.handleFacebookLoginClick}
          />
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

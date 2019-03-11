import * as React from 'react';
import { connect } from 'react-redux';

import { login } from '../lib/firebase';
import { IUserDispatchProps } from '../types/user';
import * as signinImage from '../assets/images/signin_with_google.png';

interface IMappedStateProps {
  user: IUserDispatchProps;
}

class Protected extends React.Component<IMappedStateProps> {
  public render() {
    if (this.props.user.user) {
      return <main>{this.props.children}</main>;
    } else {
      return (
        <main
          style={{
            textAlign: 'center',
          }}
        >
          <h1>You need to login to access your dashboard</h1>
          <img src={signinImage} alt="" height="52" onClick={login} />
        </main>
      );
    }
  }
}

function mapStateToProps(state: IMappedStateProps): IMappedStateProps {
  return {
    user: state.user || false,
  };
}

export default connect<IMappedStateProps>(
  mapStateToProps,
  {},
)(Protected);

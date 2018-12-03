import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { login } from '../lib/firebase';
import { User } from '../types/user';
import * as signinImage from '../assets/images/signin_with_google.png';

interface IState {
  user: User | boolean;
}

interface IProps {
  user: any;
}

class Protected extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  public render() {
    if (this.props.user) {
      return (
        <main>{this.props.children}</main>
      )
    } else {
      return (
        <main style={{
          textAlign: "center",
        }}>
          <h1>You need to login to access your dashboard</h1>
          <img
            src={signinImage}
            alt=""
            height="52"
            onClick={login}
          />
        </main>
      )
    }
  }
}

function mapStateToProps(state: IState) {
  return {
    user: state.user || false,
  }
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps) (Protected);
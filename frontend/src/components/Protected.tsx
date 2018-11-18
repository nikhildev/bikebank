import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { setLoginSuccess } from '../actions/index';
import { FirebaseAuth } from '../lib/firebase';
import { User } from '../types/user';

interface IState {
  user: User | boolean;
}

interface IProps {
  user: any;
  setLoginSuccess: Function;
}

class Protected extends React.Component<IProps, IState> {
  firebaseAuth = new FirebaseAuth();

  constructor(props: IProps) {
    super(props);
  }

  private triggerLogin() {
    this.firebaseAuth.signinWithGoogle().then((user: User) => {
      this.props.setLoginSuccess(user);
    });
  }

  public render() {
    if (this.props.user) {
      return (
        <main>{this.props.children}</main>
      )
    } else {
      this.triggerLogin();
      return (<main><h1>Not Authenticated</h1></main>)
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
    setLoginSuccess,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps) (Protected);
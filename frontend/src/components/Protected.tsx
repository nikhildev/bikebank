import * as React from 'react';
import { connect } from 'react-redux';

import { UserDispatchProps } from '../types/user';
import { requestUserLogin, AuthProvider } from '../actions/user';
import { Redirect } from 'react-router';

interface FType {
  (provider: AuthProvider, path?: string): void;
}

interface MappedDispatchProps {
  requestUserLogin: FType;
}

interface MappedStateProps {
  user: UserDispatchProps;
}

interface OwnProps {
  currentLocation?: string;
}

class Protected extends React.Component<OwnProps & MappedStateProps & MappedDispatchProps> {
  public render() {
    console.log('this. :', this.props.currentLocation);
    if (this.props.user.user) {
      return <main>{this.props.children}</main>;
    } else {
      return (
        <Redirect to={{ pathname: '/login', state: { referrer: this.props.currentLocation } }} />
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

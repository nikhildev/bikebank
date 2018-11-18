import * as React from 'react';
import { connect } from 'react-redux';

import { User } from '../../types/user';

interface IState {
  user: User | boolean;
  ownProps: any;
  error?: any;
}

interface IProps {
  user: User,
}

class DashboardPage extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      user: false,
      ownProps: null,
      error: null,
    };
  }

  public render() {
    return (
      <main
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: 16,
        }}
      >
        <h1>Dashboard - {this.props.user.displayName}</h1>
      </main>
    );
  }


}

function mapStateToProps(state: IState): IState {
  return {
    user: state.user,
    ownProps: state.ownProps,
  };
}

export default connect(mapStateToProps, null) (DashboardPage);

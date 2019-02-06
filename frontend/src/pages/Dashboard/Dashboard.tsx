import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { User } from '../../types/user';
import { Bike, fakeData } from '../../types/bike';
import { getAxiosInstance } from '../../lib/axios';

// These Will be received through redux store
interface IState {
  user: User,
  ownProps: any;
  error?: any;
  myBikes: Bike[],
}

interface IProps {
}

class DashboardPage extends React.Component<IProps & IState> {
  public componentDidMount() {
    getAxiosInstance().get('/protected').then(res => {
      console.log(res)
    }).catch(error => {
      console.error(error);
    });
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
        <Link to="dashboard/register">Register a new bike</Link>

        <div>
          {this.props.myBikes.map(bike => (
            <div
              className="bike-card"
              key={bike.id}
              >
              <span>Make: {bike.make}</span>
              <span>Model: {bike.model}</span>
              <span>Serial: {bike.serial}</span>
            </div>
          ))}
        </div>

      </main>
    );
  }


}

function mapStateToProps(state: IState): IState {
  return {
    user: state.user,
    ownProps: state.ownProps,
    myBikes: fakeData,
  };
}

export default connect(mapStateToProps, null) (DashboardPage);

import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { User } from '../../types/user';
import { IBike, fakeData } from '../../types/bike';
import { getAxiosInstance } from '../../lib/axios';

// These Will be received through redux store
interface IState {
  user?: User,
  error?: any;
  ownProps?: any,
  myBikes?: IBike[],
}

interface IProps {
}

class DashboardPage extends React.Component<IProps & IState> {

  readonly state: IState = {
    error: false,
  }

  public componentDidMount() {
    getAxiosInstance().get('/protected').then(res => {
      console.log(res)
    }).catch((error: Error) => {
      this.setState({ error });
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
        {this.props.user && <h1>Dashboard - {this.props.user.displayName}</h1>}
        <Link to="dashboard/register">Register a new bike</Link>

        {this.props.myBikes && 
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
        }
        {this.state.error && <div>Error fetching your bike information</div>}

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

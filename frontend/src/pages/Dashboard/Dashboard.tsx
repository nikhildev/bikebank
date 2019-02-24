import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Link } from 'react-router-dom';

import { User } from '../../types/user';
// import { IBike } from '../../types/bike';
import { getAxiosInstance, AxiosErrors } from '../../lib/axios';
import { AxiosResponse } from 'axios';
import { addBikesForUser } from '../../actions/bikes';

// These Will be received through redux store
interface IState {
  user?: User,
  error?: any;
  ownProps?: any,
  bikes?: string[],
}

interface IProps {
}

interface IDispatchProps {
  addBikesForUser: Function,
}

class DashboardPage extends React.Component<IProps & IDispatchProps & IState> {

  readonly state: IState = {
    error: false,
  }

  public async componentDidMount() {
    getAxiosInstance().get('/bikes').then((bikes: AxiosResponse<string[]>) => {
      this.props.addBikesForUser(bikes.data);
    }).catch((error: AxiosErrors) => {
      this.setState({ error });
      console.error(error);
    });
  }

  public render() {
    console.log(this.props);
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

        {this.props.bikes && 
          <div>
            {this.props.bikes.map(bike => (
              <div
                className="bike-card"
                key={bike}
                >
                <span>Id: {bike}</span>
              </div>
            ))}
          </div>
        }
        {this.state.error && <div>Error fetching your bike information</div>}

      </main>
    );
  }


}

const mapStateToProps = (state: IState): IState => {
  return {
    user: state.user,
    ownProps: state.ownProps,
    bikes: state.bikes,
  };
}

const mapDispatchToProps: any = (dispatch: Dispatch<any>): IDispatchProps => ({
  addBikesForUser: (bikes: string[]) => {
    dispatch(addBikesForUser(bikes));
  },
});

export default connect<IState, IDispatchProps>(mapStateToProps, mapDispatchToProps) (DashboardPage);

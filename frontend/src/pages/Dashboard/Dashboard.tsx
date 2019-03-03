import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { User } from '../../types/user';
import { requestBikesForUser } from '../../actions/bikes';
import { IBikeDispatchProps } from 'src/types/bike';
import SearchResultCard from '../../components/SearchResult/Card';

// These Will be received through redux store
interface IState {
  error?: any;
}

interface IMappedStateProps {
  user?: User;
  ownProps?: any;
  bikes: IBikeDispatchProps;
}

interface IMappedDispatchProps {
  requestBikesForUser: Function;
}

class DashboardPage extends React.Component<
  IMappedStateProps & IMappedDispatchProps & IState
> {
  readonly state: IState = {
    error: false,
  };

  async componentDidMount() {
    if (!this.props.bikes.lastUpdated) {
      this.props.requestBikesForUser();
    }
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

        {this.props.bikes.isFetching && <h3>Loading your bikes...</h3>}

        {this.props.bikes && (
          <div>
            {this.props.bikes.items.map(bike => {
              const bikeObj = {
                id: bike,
                serial: bike,
                status: 1,
              };
              return <SearchResultCard key={bike} id={bike} bike={bikeObj} />;
            })}
          </div>
        )}
        {this.state.error && <div>Error fetching your bike information</div>}
      </main>
    );
  }
}

const mapStateToProps = (state: IMappedStateProps): IMappedStateProps => {
  return {
    user: state.user,
    ownProps: state.ownProps,
    bikes: state.bikes,
  };
};

const mapDispatchToProps: IMappedDispatchProps = {
  requestBikesForUser,
};

export default connect<IMappedStateProps, IMappedDispatchProps>(
  mapStateToProps,
  mapDispatchToProps,
)(DashboardPage);

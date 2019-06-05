import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { requestBikesForUser } from '../../actions/bikes';
import { BikeDispatchProps } from '../../types/bike';
import SearchResultCard from '../../components/SearchResult/Card';
import { UserDispatchProps } from '../../types/user';

// These Will be received through redux store
interface IState {
  error?: any;
}

interface MappedStateProps {
  user: UserDispatchProps;
  ownProps?: any;
  bikes: BikeDispatchProps;
}

interface MappedDispatchProps {
  requestBikesForUser: Function;
}

class DashboardPage extends React.Component<MappedStateProps & MappedDispatchProps & IState> {
  componentDidMount() {
    if (!this.props.bikes.lastUpdated) {
      this.props.requestBikesForUser();
    }
  }

  refreshUserBikes = () => {
    this.props.requestBikesForUser(true);
  };

  public render() {
    return (
      <main className="container-fluid h-100">
        {this.props.user && this.props.user.user && (
          <React.Fragment>
            <h1 className="my-3">Dashboard - {this.props.user.user.displayName}</h1>

            <Link className="btn btn-primary" to="dashboard/register">
              Register a new bike
            </Link>

            <button className="btn btn-accent" onClick={this.refreshUserBikes}>
              Refresh
            </button>

            {this.props.bikes.isFetching && <h3>Loading your bikes...</h3>}

            {this.props.bikes && (
              <div>
                {this.props.bikes.items.map((bike) => {
                  return <SearchResultCard key={bike.id} id={bike.id} bike={bike} />;
                })}
                {!this.props.bikes.isFetching && !this.props.bikes.items.length && (
                  <div>You have not registered any bikes</div>
                )}
              </div>
            )}
            {this.props.bikes.hasError && (
              <div>Error fetching your bike information. Press refresh to try again.</div>
            )}
          </React.Fragment>
        )}
      </main>
    );
  }
}

const mapStateToProps = (state: MappedStateProps): MappedStateProps => {
  return {
    user: state.user,
    ownProps: state.ownProps,
    bikes: state.bikes,
  };
};

const mapDispatchToProps: MappedDispatchProps = {
  requestBikesForUser,
};

export default connect<MappedStateProps, MappedDispatchProps>(
  mapStateToProps,
  mapDispatchToProps,
)(DashboardPage);

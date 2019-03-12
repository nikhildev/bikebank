import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { requestBikesForUser } from '../../actions/bikes';
import { IBikeDispatchProps } from 'src/types/bike';
import SearchResultCard from '../../components/SearchResult/Card';

// These Will be received through redux store
interface IState {
  error?: any;
}

interface MappedStateProps {
  user: firebase.User | null;
  ownProps?: any;
  bikes: IBikeDispatchProps;
}

interface MappedDispatchProps {
  requestBikesForUser: Function;
}

class DashboardPage extends React.Component<
  MappedStateProps & MappedDispatchProps & IState
> {
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
      <main
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: 16,
        }}
      >
        {this.props.user && <h1>Dashboard - {this.props.user.displayName}</h1>}
        <Link to="dashboard/register">Register a new bike</Link>

        <button onClick={this.refreshUserBikes}>Refresh</button>

        {this.props.bikes.isFetching && <h3>Loading your bikes...</h3>}

        {this.props.bikes && (
          <div>
            {this.props.bikes.items.map(bike => {
              return (
                <SearchResultCard key={bike.id} id={bike.id} bike={bike} />
              );
            })}
          </div>
        )}
        {this.props.bikes.hasError && (
          <div>
            Error fetching your bike information. Press refresh to try again.
          </div>
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

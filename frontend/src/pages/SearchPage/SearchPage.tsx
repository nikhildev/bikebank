import * as React from 'react';

import SearchInputMain from '../../components/SearchInput/SearchInputMain';
import SearchResultCard from '../../components/SearchResult/Card';
import { Bike } from '../../types/bike';
import { ConnectedRouterProps } from 'connected-react-router';
import { RequestStatus } from 'src/types/http';
import { searchBikeByBin } from 'src/api/bikes';

interface State {
  requestStatus: RequestStatus;
  searchSerial: string;
  bikes: Bike[];
  error: any;
}

class SearchPage extends React.Component<ConnectedRouterProps, State> {
  readonly state: State = {
    requestStatus: RequestStatus.Initial,
    searchSerial: '',
    bikes: [],
    error: null,
  };

  async componentDidMount() {
    const bikeId = this.props['match'].params.bikeId;
    if (bikeId && bikeId.length) {
      this.setState({
        searchSerial: this.props['match'].params.bikeId,
      });
      await this.handleSearchSubmit(bikeId);
    }
  }

  async componentWillReceiveProps(props: ConnectedRouterProps) {
    const bikeId = props['match'].params.bikeId;
    if (bikeId && bikeId.length && bikeId !== this.state.searchSerial) {
      await this.handleSearchSubmit(bikeId);
    }
  }

  private searchBike = async (bikeId: string) => {
    this.props.history.push(`/search/${bikeId}`);
    let bikes;

    try {
      bikes = await searchBikeByBin(bikeId);
      this.setState({
        bikes,
        requestStatus: RequestStatus.Success,
      });
    } catch (error) {
      this.setState({
        error,
        requestStatus: RequestStatus.Error,
      });
    }
  };

  public handleSearchSubmit = async (bin: string) => {
    this.setState({
      requestStatus: RequestStatus.Started,
      searchSerial: bin,
    });
    await this.searchBike(bin);
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
        <h2>Search</h2>
        <SearchInputMain
          onSearch={this.handleSearchSubmit}
          defaultSearchString={this.state.searchSerial}
        />

        {this.state.requestStatus === RequestStatus.Started && <div>Searching...</div>}

        {this.state.requestStatus === RequestStatus.Success && !this.state.bikes.length && (
          <div>No bikes found for the serial {this.state.searchSerial}</div>
        )}

        {this.state.requestStatus === RequestStatus.Success && this.state.bikes.length > 0 && (
          <div>
            <h3>Bikes found with the serial {this.state.searchSerial}</h3>
            {this.state.bikes.map((bike) => (
              <SearchResultCard key={bike.id} id={bike.id} bike={bike} />
            ))}
          </div>
        )}

        {this.state.requestStatus === RequestStatus.Error && (
          <div>An error occurred while searching.</div>
        )}
      </main>
    );
  }
}

export default SearchPage;

import * as React from 'react';

import SearchInputMain from '../../components/SearchInput/SearchInputMain';
import SearchResultCard from '../../components/SearchResult/Card';

// import { searchBikeByBin } from '../../api/search';
import { IBike } from '../../types/bike';
import { getAxiosInstance, AxiosErrors } from '../../lib/axios';
import { AxiosResponse } from 'axios';
import { ConnectedRouterProps } from 'connected-react-router';

interface IState {
  searchSerial: string;
  isSearching: boolean;
  bikes: IBike[];
  error: any;
}

class SearchPage extends React.Component<ConnectedRouterProps, IState> {
  bikeId: string;

  constructor(props: any) {
    super(props);
    this.bikeId = this.props['match'].params.bikeId;
    this.state = {
      searchSerial: '',
      isSearching: false,
      bikes: [],
      error: null,
    };
  }

  componentDidMount() {
    if (this.bikeId.length) {
      this.handleSearchSubmit(this.bikeId);
    }
  }

  private searchBike = (bikeId: string) => {
    this.props.history.push(`/search/${bikeId}`);
    getAxiosInstance()
      .get(`/search/${bikeId}`)
      .then((bikes: AxiosResponse<IBike[]>) => {
        this.setState({
          bikes: bikes.data,
          isSearching: false,
        });
      })
      .catch((error: AxiosErrors) => {
        this.setState({
          error,
          isSearching: false,
        });
        console.error(error);
      });
  };

  public handleSearchSubmit = (bin: string) => {
    this.setState({
      isSearching: true,
      searchSerial: bin,
    });
    this.searchBike(bin);
  };

  public render() {
    console.log(this.state.bikes.length);

    return (
      <main
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: 16,
        }}
      >
        <h2>Search</h2>
        <SearchInputMain onSearch={this.handleSearchSubmit} />

        {/* Search complete and at least one bike found */}
        {this.state.bikes.length && !this.state.isSearching && (
          <div>
            <h3>Bikes found with the serial {this.state.searchSerial}</h3>
            {this.state.bikes.map(bike => (
              <SearchResultCard key={bike.id} id={bike.id} bike={bike} />
            ))}
          </div>
        )}
      </main>
    );
  }
}

export default SearchPage;

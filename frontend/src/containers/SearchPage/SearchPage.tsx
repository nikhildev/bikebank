import * as React from 'react';

import SearchInputMain from '../../components/SearchInput/SearchInputMain';
import SearchResultCard from '../../components/SearchResult/Card';

import { searchBikeByBin } from '../../api/search';
import { Bike } from '../../types/bike';

interface IState {
  bikes: Bike[];
  error: any;
}

class SearchPage extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      bikes: [],
      error: null,
    };
  }

  public searchBike = (bikeId: string) => {
    searchBikeByBin(bikeId)
      .then(res => {
        this.setState({
          bikes: res.data,
        });
      })
      .catch(err => {
        this.setState({
          error: err,
        });
      });
  };

  public handleSearchInputChange = (bin: string) => {
    this.searchBike(bin);
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
        <SearchInputMain onSearchTextChange={this.handleSearchInputChange} />
        {this.state.bikes.map(bike => (
          <SearchResultCard
            key={bike.id}
            id={bike.id}
            serial={bike.serial}
          />
        ))}
      </main>
    );
  }
}

export default SearchPage;

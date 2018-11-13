import * as React from 'react';

import SearchInputMain from '../../components/SearchInput/SearchInputMain';
import SearchResultCard from '../../components/SearchResult/Card';

import { Bike, searchBikeByBin } from '../../api/search';

interface ISearchPageState {
  bikes: Bike[];
}

class SearchPage extends React.Component<{}, ISearchPageState> {
  constructor(props: any) {
    super(props);

    this.state = {
      bikes: [],
    };
  }

  public searchBike = (bin: string) => {
    const bikes = searchBikeByBin(bin);
    this.setState({
      bikes,
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
            bikeId={bike.id}
            bikeName={bike.name}
          />
        ))}
      </main>
    );
  }
}

export default SearchPage;

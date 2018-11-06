import * as React from 'react';

import SearchInputMain from '../../components/SearchInput/SearchInputMain';
import SearchResultCard from '../../components/SearchResult/Card';

import { searchBikeByBin } from '../../api/search';
import { Bike } from '../../api/search';

interface SearchPageState {
  bikes: Bike[],
}

class SearchPage extends React.Component<{}, SearchPageState> {
  constructor(props: any) {
    super(props);
    
    this.state = {
      bikes: [],
    };
  }

  componentDidMount = () => {
  }

  searchBike = (bin: string) => {
    const bikes = searchBikeByBin(bin);
    this.setState({
      bikes,
    });
  }

  handleSearchInputChange = (bin: string) => {
    this.searchBike(bin);
  }
  
  render() {
    return (
      <main style={{
        display: 'flex',
        flexDirection: 'column',
        padding: 16,
      }}>
        <h2>Search</h2>
        <SearchInputMain onSearchTextChange={this.handleSearchInputChange} />
        {this.state.bikes.map(bike =>
          <SearchResultCard
            key={bike.id}
            bikeId={bike.id}
            bikeName={bike.name} />
        )}
      </main>
    )
  }
}

export default SearchPage;
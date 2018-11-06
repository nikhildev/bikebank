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
    const bikes = searchBikeByBin('A1');
    this.setState({
      bikes,
    });
    console.log(this.state);
  }
  
  render() {
    return (
      <main style={{
        display: 'flex',
        flexDirection: 'column',
        padding: 16,
      }}>
        <h2>Search</h2>
        <SearchInputMain />
        {this.state.bikes.map(bike =>
          <SearchResultCard bikeId={bike.id} bikeName={bike.name} />
        )}
      </main>
    )
  }
}

export default SearchPage;
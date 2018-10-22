import * as React from 'react';

import SearchInputMain from "../../components/SearchInput/SearchInputMain";
import SearchResultCard from '../../components/SearchResult/Card';

class SearchPage extends React.Component {
  render() {
    return (
      <main style={{
        display: 'flex',
        flexDirection: 'column',
        padding: 16,
      }}>
        <h2>Search</h2>
        <SearchInputMain />
        <SearchResultCard bikeId={23} bikeName={'skldjfl'} />
      </main>
    )
  }
}

export default SearchPage;
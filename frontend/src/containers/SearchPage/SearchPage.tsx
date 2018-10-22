import * as React from 'react';

import SearchInputMain from "../../components/SearchInput/SearchInputMain";

class SearchPage extends React.Component {
  render() {
    return (
      <main>
        <h2>Search</h2>
        <SearchInputMain />
      </main>
    )
  }
}

export default SearchPage;
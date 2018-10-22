import * as React from 'react';

import { searchBikeId } from '../../api/search';
import log from '../../lib/log';

class SearchInputMain extends React.Component {
  handleSearchTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    searchBikeId(event.currentTarget.value).then(res => {
      log(res);
    });
  }

  render() {
    return (
      <input
        type="text"
        onChange={this.handleSearchTextChange}
      />
    )
  }
}

export default SearchInputMain;
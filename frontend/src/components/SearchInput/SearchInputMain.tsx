import * as React from 'react';

import './searchInputMain.scss';

interface SearchInputMainProps {
  onSearchTextChange: Function,
}

class SearchInputMain extends React.Component<SearchInputMainProps> {

  constructor(props: SearchInputMainProps) {
    super(props);
  }
  handleSearchTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchString = event.currentTarget.value.toString();
    this.props.onSearchTextChange(searchString);
  }

  render() {
    return (
      <input
        id="search-input-main"
        type="text"
        onChange={this.handleSearchTextChange}
      />
    )
  }
}

export default SearchInputMain;
import * as React from 'react';

class SearchInputMain extends React.Component {
  handleSearchTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.currentTarget.value);
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
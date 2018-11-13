import * as React from 'react';

import './searchInputMain.scss';

interface ISearchInputMainProps {
  onSearchTextChange: () => void,
}

class SearchInputMain extends React.Component<ISearchInputMainProps> {

  constructor(props: ISearchInputMainProps) {
    super(props);
  }
  public handleSearchTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchString = event.currentTarget.value.toString();
    this.props.onSearchTextChange(searchString);
  }

  public render() {
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
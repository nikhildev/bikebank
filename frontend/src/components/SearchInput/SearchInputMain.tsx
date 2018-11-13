import * as React from 'react';

import './searchInputMain.scss';

interface IProps {
  onSearchTextChange: (searchString: string) => void,
}

class SearchInputMain extends React.Component<IProps> {

  constructor(props: IProps) {
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
import * as React from 'react';

import './searchInputMain.scss';

interface IProps {
  defaultSearchString?: string;
  onSearch: (searchString: string) => void;
}

interface IState {
  searchString: string;
}

class SearchInputMain extends React.Component<IProps, IState> {
  readonly state: IState = {
    searchString: '',
  };

  public handleSearchTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      searchString: event.currentTarget.value.toString(),
    });
  };

  public render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          id="search-input-main"
          type="text"
          value={this.props.defaultSearchString || this.state.searchString}
          onChange={this.handleSearchTextChange}
        />
        <button type="submit">Search</button>
      </form>
    );
  }

  private handleSubmit = (
    event: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>,
  ): void => {
    event.preventDefault();
    this.props.onSearch(this.state.searchString);
  };
}

export default SearchInputMain;

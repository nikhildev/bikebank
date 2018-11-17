import * as React from 'react';

import './searchInputMain.scss';

interface IProps {
  onSearch: (searchString: string) => void,
}

interface IState {
  searchString: string,
}

class SearchInputMain extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);

    this.state = {
      searchString: '',
    }
  }
  public handleSearchTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      searchString: event.currentTarget.value.toString(),
    })
  }

  public render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          id="search-input-main"
          type="text"
          onChange={this.handleSearchTextChange}
        />
        <button
          type="submit"
          >Search
        </button>

      </form>
    )
  }

  private handleSubmit = (
    event: React.MouseEvent<HTMLButtonElement>| React.FormEvent<HTMLFormElement>
  ): void => {
    event.preventDefault();
    this.props.onSearch(this.state.searchString);
  }

}

export default SearchInputMain;
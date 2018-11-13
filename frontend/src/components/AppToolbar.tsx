import * as React from 'react';

interface IProps {
  appTitle: string,
}

class AppToolbar extends React.Component<IProps> {
  public render() {
    return (
      <div>
        <nav>Search</nav>
        <nav>My Dashboard</nav>
      </div>
    )
  }
}

export default AppToolbar;
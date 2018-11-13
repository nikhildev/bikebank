import * as React from 'react';

interface IAppToolbarProps {
  appTitle: string,
}

class AppToolbar extends React.Component<IAppToolbarProps> {
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
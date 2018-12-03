import * as React from 'react';

interface IState {
  error: any;
}

class LoginPage extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      error: null,
    };
  }

  public render() {
    return (
      <main
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: 16,
        }}
      >
        <h2>Login</h2>
      </main>
    );
  }
}

export default LoginPage;

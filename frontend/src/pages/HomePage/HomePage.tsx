import * as React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <main className="MainPage">
      <h1>Home Page</h1>
      <Link to="/dashboard">My Dashboard</Link>
    </main>
  );
};

export default HomePage;

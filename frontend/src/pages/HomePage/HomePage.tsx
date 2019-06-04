import * as React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

const HomePage: React.FC = () => {
  return (
    <main className="MainPage p-3">
      <div className="jumbotron">
        <h1 className="display-4">Bike Bank</h1>
        <p className="lead">
          By registering you bike with Bike Bank, you will be make your bike searchanble with its
          serial number.
        </p>
        <hr className="my-4" />
        <Link className="btn btn-primary btn-lg" to="/dashboard">
          My Dashboard
        </Link>
      </div>
    </main>
  );
};

export default HomePage;

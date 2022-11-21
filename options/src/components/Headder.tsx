import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import './Headder.css';

const Headder: FC = () => {
  return (
    <div>
      <nav className="navbar">
        <ul className="navbar-ul">
          <div className="navaba-logo">
            <h1>AlgoBreaker</h1>
          </div>
          <div className="navbar-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/summary">Summary</Link>
            </li>
          </div>
        </ul>
      </nav>
    </div>
  );
};

export default Headder;

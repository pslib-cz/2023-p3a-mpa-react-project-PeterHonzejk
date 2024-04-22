import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => (
  <div>
    <h1>Welcome to Gwent</h1>
    <Link to="/game">Start Game</Link>
    <br/>
    <Link to="/build">Build Deck</Link>
  </div>
);

export default Home;

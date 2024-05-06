import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const startGame = () => {
    const deck = localStorage.getItem('userDeck');
    const leader = localStorage.getItem('userLeader');
    if (deck && leader && JSON.parse(deck).length === 20 && JSON.parse(leader)) {
      navigate('/game');
    } else {
      alert('You must have exactly 20 non-leader cards and 1 leader card in your deck to start the game.');
    }
  };

  return (
    <div>
      <h1>Welcome to Gwent</h1>
      <button onClick={startGame}>Start Game</button>
      <br/>
      <Link to="/build">Build Deck</Link>
    </div>
  );
};

export default Home;

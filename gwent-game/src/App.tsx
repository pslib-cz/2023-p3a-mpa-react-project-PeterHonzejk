import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import GameBoard from './components/GameBoard';
import DeckBuilder from './components/DeckBuilder';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<GameBoard />} />
        <Route path="/build" element={<DeckBuilder />} />
      </Routes>
    </Router>
  );
};

export default App;

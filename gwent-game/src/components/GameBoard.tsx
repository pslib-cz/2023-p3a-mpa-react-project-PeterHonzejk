import React, { useState, useEffect } from 'react';
import Card from './Card';
import { CardData } from './cardData';

const GameBoard: React.FC = () => {
  const [deck, setDeck] = useState<CardData[]>(() => {
    const savedDeck = localStorage.getItem('userDeck');
    return savedDeck ? JSON.parse(savedDeck) : [];
  });
  const [score, setScore] = useState(0);

  const playCard = (cardId: number) => {
    const card = deck.find(card => card.id === cardId);
    if (card) {
      setScore(score + card.power);
      setDeck(deck.filter(c => c.id !== cardId));
    }
  };

  return (
    <div>
      <h1>Game Board</h1>
      <p>Score: {score}</p>
      {deck.map(card => (
        <Card key={card.id} {...card} onPlay={() => playCard(card.id)} />
      ))}
    </div>
  );
};

export default GameBoard;

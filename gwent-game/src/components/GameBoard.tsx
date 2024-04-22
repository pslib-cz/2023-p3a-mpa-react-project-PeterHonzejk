import React, { useState } from 'react';
import Card from './Card';

const initialDeck = [
    { id: 1, type: "close", name: "Captain Elise Durant", power: 10, ability: "Hero", lore: "Captain Durant, a legendary pilot known for her daring maneuvers in close-quarters space combat, has now brought her expertise to the ground forces." },
];

const GameBoard: React.FC = () => {
  const [deck, setDeck] = useState(initialDeck);
  const [score, setScore] = useState(0);

  const playCard = (cardId: number) => {
    const card = deck.find(card => card.id === cardId);
    if (card) {
      setScore(score + card.power);
      setDeck(deck.filter(card => card.id !== cardId));
    }
  };

  return (
    <div>
      <h1>Game Board</h1>
      <p>Score: {score}</p>
      {deck.map(card => (
        <Card key={card.id}
              id={card.id}
              name={card.name}
              power={card.power}
              ability={card.ability}
              type={card.type}
              lore={card.lore}
              onPlay={() => playCard(card.id)} />
      ))}
    </div>
  );
};

export default GameBoard;

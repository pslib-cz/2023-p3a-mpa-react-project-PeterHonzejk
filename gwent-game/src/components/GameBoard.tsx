import React, { useState } from 'react';
import Card from './Card';
import { CardData } from './cardData';

type CardType = 'Close Combat' | 'Ranged Combat' | 'Siege' | 'Leader' | 'Weather';

interface Scores {
  'Close Combat': number;
  'Ranged Combat': number;
  Siege: number;
  Leader: number;
  Weather: number;
}

interface PlayedCards {
  'Close Combat': CardData[];
  'Ranged Combat': CardData[];
  Siege: CardData[];
  Leader: CardData[];
  Weather: CardData[];
}

const GameBoard: React.FC = () => {
  const [cardsInHand, setCardsInHand] = useState<CardData[]>(() => {
    const savedDeck = localStorage.getItem('userDeck');
    return savedDeck ? JSON.parse(savedDeck) : [];
  });

  const [playedCards, setPlayedCards] = useState<PlayedCards>({
    'Close Combat': [],
    'Ranged Combat': [],
    Siege: [],
    Leader: [],
    Weather: []
  });

  const [scores, setScores] = useState<Scores>({
    'Close Combat': 0,
    'Ranged Combat': 0,
    Siege: 0,
    Leader: 0,
    Weather: 0
  });

  const playCard = (cardId: number, type: CardType) => {
    const cardIndex = cardsInHand.findIndex(card => card.id === cardId);
    if (cardIndex > -1) {
      const card = cardsInHand[cardIndex];
      setCardsInHand(cardsInHand.filter((_, index) => index !== cardIndex));
      setPlayedCards(prev => ({
        ...prev,
        [type]: [...prev[type], card]
      }));
      setScores(prevScores => ({
        ...prevScores,
        [type]: prevScores[type] + card.power
      }));
    }
  };

  const renderRow = (type: CardType) => {
    return (
      <div key={type}>
        <h2>{type} Cards - Score: {scores[type]}</h2>
        {playedCards[type].map(card => (
          <Card key={card.id} {...card} onPlay={() => {}} />
        ))}
      </div>
    );
  };

  return (
    <div>
      <h1>Game Board</h1>
      <h2>Your Cards</h2>
      {cardsInHand.map(card => (
        <Card key={card.id} {...card} onPlay={() => playCard(card.id, card.type as CardType)} />
      ))}
      {(['Close Combat', 'Ranged Combat', 'Siege', 'Leader', 'Weather'] as CardType[]).map(type => renderRow(type))}
    </div>
  );
};

export default GameBoard;

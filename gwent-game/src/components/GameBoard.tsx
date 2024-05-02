import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  const [cardsInHand, setCardsInHand] = useState<CardData[]>([]);
  const [remainingCards, setRemainingCards] = useState<CardData[]>([]); // Store remaining cards
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

  const navigate = useNavigate();

  useEffect(() => {
    const deck = localStorage.getItem('userDeck');
    const leader = localStorage.getItem('userLeader');
    if (!deck || JSON.parse(deck).length !== 20 || !leader) {
      alert('You must have exactly 20 cards and a leader card in your deck to play the game.');
      navigate('/');
    } else {
      const loadedDeck = JSON.parse(deck);
      const loadedLeader = JSON.parse(leader);
      const shuffledDeck = shuffle([...loadedDeck]);
      const selectedCards = shuffledDeck.slice(0, 10); // Select 10 random cards
      const remainingDeck = shuffledDeck.slice(10);   // Remaining cards
      setCardsInHand([...selectedCards, loadedLeader]); // Include leader card
      setRemainingCards(remainingDeck);
    }
  }, [navigate]);

  const shuffle = (deck: CardData[]) => {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]]; // Swap elements
    }
    return deck;
  };

  const playCard = (cardId: number, type: CardType) => {
    const cardIndex = cardsInHand.findIndex(card => card.id === cardId);
    if (cardIndex > -1) {
      const card = cardsInHand.splice(cardIndex, 1)[0];
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
      <div style={{ marginTop: '20px' }}>
        <Link to="/">Exit</Link>
      </div>
    </div>
  );
};

export default GameBoard;

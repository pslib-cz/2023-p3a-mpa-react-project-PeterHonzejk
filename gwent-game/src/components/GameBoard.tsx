import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Card from './Card';
import { CardData, cardPool } from './cardData';

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
  const [aiDeck, setAIDeck] = useState<CardData[]>([]);
  const [aiLeader, setAILeader] = useState<CardData | null>(null);
  const [remainingCards, setRemainingCards] = useState<CardData[]>([]); 
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
      const { leader: aiLeaderCard, deck: aiDeckCards } = getAIDeck();
      setAILeader(aiLeaderCard);
      setAIDeck(aiDeckCards);

      const shuffledDeck = shuffle([...loadedDeck, loadedLeader]); 
      const selectedCards = shuffledDeck.slice(0, 10); 
      const remainingDeck = shuffledDeck.slice(10);   

      setCardsInHand(selectedCards);
      setRemainingCards(remainingDeck);
    }
  }, [navigate]);

  const getAIDeck = () => {
    const factions = ['Humanity', 'Aliens', 'Rebels', 'Androids'];
    const selectedFaction = factions[Math.floor(Math.random() * factions.length)];

    const factionLeaders = cardPool.filter(card => card.faction === selectedFaction && card.type === 'Leader');
    const leader = factionLeaders[Math.floor(Math.random() * factionLeaders.length)];

    const factionCards = cardPool.filter(card => card.faction === selectedFaction && card.type !== 'Leader');
    let aiDeck: CardData[] = []; 

    while (aiDeck.length < 20) {
      const randomCard = factionCards[Math.floor(Math.random() * factionCards.length)];
      if (!aiDeck.find(card => card.id === randomCard.id)) {
        aiDeck.push(randomCard);
      }
    }

    return { leader, deck: aiDeck };
  };

  const shuffle = (deck: CardData[]) => {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
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

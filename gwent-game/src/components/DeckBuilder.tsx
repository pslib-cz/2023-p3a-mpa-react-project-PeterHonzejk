import React, { useState, useEffect } from 'react';
import Card from './Card';
import { CardData, cardPool } from './cardData';

const DeckBuilder: React.FC = () => {
  const [deck, setDeck] = useState<CardData[]>(() => {
    const savedDeck = localStorage.getItem('userDeck');
    return savedDeck ? JSON.parse(savedDeck) : [];
  });

  const [selectedLeader, setSelectedLeader] = useState<number | null>(null);
  const [availableCards, setAvailableCards] = useState<CardData[]>([]);

  useEffect(() => {
    const leader = cardPool.find(card => card.id === selectedLeader);
    if (leader) {
      const leaderFaction = leader.faction;
      const newAvailableCards = cardPool.filter(card => card.faction === leaderFaction || card.type === "Weather");
      const newDeck = newAvailableCards.filter(card => card.id !== leader.id); 
      setAvailableCards(newAvailableCards);
      setDeck([leader]);
    } else {
      setAvailableCards([]);
      setDeck([]);
    }
  }, [selectedLeader]); 

  useEffect(() => {
    localStorage.setItem('userDeck', JSON.stringify(deck));
  }, [deck]);

  const addToDeck = (cardId: number) => {
    const card = availableCards.find(card => card.id === cardId);
    if (card) {
      setDeck(currentDeck => [...currentDeck, card]);
      setAvailableCards(currentAvailable => currentAvailable.filter(c => c.id !== cardId));
    }
  };

  const removeFromDeck = (cardId: number) => {
    const card = deck.find(card => card.id === cardId);
    if (card && card.type !== "Leader") { // Prevent removing the leader
      setAvailableCards(currentAvailable => [...currentAvailable, card]);
      setDeck(currentDeck => currentDeck.filter(c => c.id !== cardId));
    }
  };

  const filteredCards = (type: string) => availableCards.filter(card => card.type === type);

  const leaderOptions = cardPool.filter(card => card.type === 'Leader');

  return (
    <div>
      <h1>Deck Builder</h1>
      <div>
        <label>Select Leader:</label>
        {leaderOptions.map(leader => (
          <div key={leader.id} onClick={() => setSelectedLeader(leader.id)} 
               style={{ 
                 border: '1px solid black', 
                 padding: '10px', 
                 margin: '5px', 
                 cursor: 'pointer',
                 backgroundColor: selectedLeader === leader.id ? 'lightblue' : 'white' 
               }}>
            <h3>{leader.name} - {leader.faction}</h3>
            <p>Ability: {leader.ability}</p>
            <p>Description: {leader.lore}</p>
          </div>
        ))}
      </div>
      {selectedLeader && (
        <>
          <div>
            <h2>Your Deck</h2>
            {deck.map(card => (
              <Card key={card.id} {...card} onPlay={() => removeFromDeck(card.id)} />
            ))}
            {deck.length === 0 && <p>No cards in your deck. Click on a card below to add it.</p>}
          </div>
          {['Close Combat', 'Ranged Combat', 'Siege', 'Leader', 'Weather'].map((type) => (
            <div key={type}>
              <h2>{type.charAt(0).toUpperCase() + type.slice(1)} Cards</h2>
              {filteredCards(type).map(card => (
                <Card key={card.id} {...card} onPlay={() => addToDeck(card.id)} />
              ))}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default DeckBuilder;
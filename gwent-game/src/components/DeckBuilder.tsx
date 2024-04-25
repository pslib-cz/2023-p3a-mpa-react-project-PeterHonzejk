import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from './Card';
import { CardData, cardPool } from './cardData';

const DeckBuilder: React.FC = () => {
  const [deck, setDeck] = useState<CardData[]>(() => {
    const savedDeck = localStorage.getItem('userDeck');
    return savedDeck ? JSON.parse(savedDeck) : [];
  });

  const [selectedFaction, setSelectedFaction] = useState<string | null>(null);
  const [selectedLeader, setSelectedLeader] = useState<number | null>(null);
  const [availableCards, setAvailableCards] = useState<CardData[]>([]);

  useEffect(() => {
    localStorage.setItem('userDeck', JSON.stringify(deck));
  }, [deck]);

  useEffect(() => {
    if (selectedFaction) {
      const factionCards = cardPool.filter(card => card.faction === selectedFaction || card.type === "Weather");
      setAvailableCards(factionCards.filter(card => card.type !== 'Leader' && !deck.some(d => d.id === card.id))); // Exclude leaders from available cards
    } else {
      setAvailableCards([]);
      setDeck([]);
    }
  }, [selectedFaction, deck]);

  useEffect(() => {
    if (selectedLeader) {
      const leader = cardPool.find(card => card.id === selectedLeader);
      if (leader) {
        setDeck([leader]);
      }
    }
  }, [selectedLeader]);

  const handleFactionChange = (faction: string) => {
    setSelectedFaction(faction);
    setSelectedLeader(null);
    setDeck([]); 
  };

  const handleLeaderSelection = (leaderId: number) => {
    setSelectedLeader(leaderId);
  };

  const addToDeck = (cardId: number) => {
    const card = availableCards.find(card => card.id === cardId);
    if (card && !deck.some(dc => dc.id === cardId)) {
      setDeck(currentDeck => [...currentDeck, card]);
    }
  };

  const removeFromDeck = (cardId: number) => {
    const card = deck.find(card => card.id === cardId);
    if (card && card.type !== 'Leader') {
      setDeck(currentDeck => currentDeck.filter(c => c.id !== cardId));
    }
  };

  const factions = Array.from(new Set(cardPool.filter(card => card.type === 'Leader').map(card => card.faction)));

  return (
    <div>
      <h1>Deck Builder</h1>
      <div>
        <label>Select Faction:</label>
        <select onChange={(e) => handleFactionChange(e.target.value)} value={selectedFaction || ""}>
          <option value="">Choose a faction</option>
          {factions.map(faction => (
            <option key={faction} value={faction}>{faction}</option>
          ))}
        </select>
      </div>
      {selectedFaction && (
        <div>
          <label>Select Leader:</label>
          <select onChange={(e) => handleLeaderSelection(Number(e.target.value))} value={selectedLeader || ""}>
            <option value="">Choose a leader</option>
            {cardPool.filter(card => card.faction === selectedFaction && card.type === 'Leader').map(leader => (
              <option key={leader.id} value={leader.id}>{leader.name}</option>
            ))}
          </select>
        </div>
      )}
      {selectedLeader && (
        <>
          <div>
            <h2>Your Deck</h2>
            {deck.map(card => (
              <Card key={card.id} {...card} onPlay={() => removeFromDeck(card.id)} />
            ))}
            {deck.length === 0 && <p>No cards in your deck yet.</p>}
          </div>
          <div>
            <h2>Available Cards</h2>
            {availableCards.map(card => (
              <Card key={card.id} {...card} onPlay={() => addToDeck(card.id)} />
            ))}
          </div>
        </>
      )}
      <Link to="/">Exit</Link>
    </div>
  );
};

export default DeckBuilder;

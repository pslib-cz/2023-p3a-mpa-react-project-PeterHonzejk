import React, { useState, useEffect } from 'react';
import Card from './Card';
import { CardData, cardPool } from './cardData';

const DeckBuilder: React.FC = () => {
  const [deck, setDeck] = useState<CardData[]>(() => {
    const savedDeck = localStorage.getItem('userDeck');
    return savedDeck ? JSON.parse(savedDeck) : [];
  });
  const [availableCards, setAvailableCards] = useState<CardData[]>(cardPool.filter(cp => !deck.find(d => d.id === cp.id)));

  useEffect(() => {
    localStorage.setItem('userDeck', JSON.stringify(deck));
  }, [deck]);

  const addToDeck = (cardId: number) => {
    const card = availableCards.find(card => card.id === cardId);
    if (card) {
      setDeck(deck.concat(card));
      setAvailableCards(availableCards.filter(c => c.id !== cardId));
    }
  };

  const removeFromDeck = (cardId: number) => {
    const card = deck.find(card => card.id === cardId);
    if (card) {
      setAvailableCards(availableCards.concat(card));
      setDeck(deck.filter(c => c.id !== cardId));
    }
  };

  return (
    <div>
      <h1>Deck Builder</h1>
      <div>
        <h2>Your Deck</h2>
        {deck.map(card => (
          <Card key={card.id} {...card} onPlay={() => removeFromDeck(card.id)} />
        ))}
        {deck.length === 0 && <p>No cards in your deck. Click on a card below to add it.</p>}
      </div>
      <div>
        <h2>Available Cards</h2>
        {availableCards.map(card => (
          <Card key={card.id} {...card} onPlay={() => addToDeck(card.id)} />
        ))}
      </div>
    </div>
  );
};

export default DeckBuilder;

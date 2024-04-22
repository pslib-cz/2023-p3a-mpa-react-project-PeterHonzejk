import React from 'react';

interface CardProps {
  id: number;
  name: string;
  power: number;
  ability: string;
  type: string;  
  lore: string;    
  onPlay: () => void;
}

const Card: React.FC<CardProps> = ({ name, power, ability, type, lore, onPlay }) => (
  <div onClick={onPlay} style={{ cursor: 'pointer', border: '1px solid black', padding: '10px', margin: '5px' }}>
    <h3>{name} ({type})</h3>
    <p>Power: {power}</p>
    <p>Ability: {ability}</p>
    <p>Description: {lore}</p> 
  </div>
);

export default Card;

import React, { useState } from 'react';
import Card from './Card';

interface CardData {
    id: number;
    type: string;
    name: string;
    power: number;
    ability: string;
    lore: string;
  }

const cardPool: CardData[] = [
    // Weather cards
    { id: 1, type: "weather", name: "Ionic Storm", power: 0, ability: "Weaken Close", lore: "Generated by high-altitude weather machines, Ionic Storms release charged particles that disrupt close-range combat equipment and personnel." },
    { id: 2, type: "weather", name: "Gravitational Fog", power: 0, ability: "Weaken Range", lore: "Emitted from orbital platforms, Gravitational Fog warps local gravity, significantly hindering the operation of ranged weaponry." },
    { id: 3, type: "weather", name: "Nano-Swarm Rain", power: 0, ability: "Weaken Siege", lore: "Nano-Swarm Rain consists of billions of microscopic robots that swarm siege equipment, jamming mechanics and electronics temporarily." },
    { id: 4, type: "weather", name: "Atmospheric Equalizer", power: 0, ability: "Normalize", lore: "The Atmospheric Equalizer stabilizes weather conditions with a burst of neutralizing energy, restoring order to the battlefield environment." },
    // Human Faction - Close Combat
    { id: 101, type: "close", name: "Infantry Drone", power: 5, ability: "Tight Bond", lore: "Infantry Drones, modeled after ancient warriors but enhanced with lethal precision and unyielding stamina, lead the charge in ground battles across the cosmos." },
    { id: 102, type: "close", name: "Cyber Knight", power: 7, ability: "Morale Boost", lore: "Cyber Knights are elite warriors, blending centuries-old combat traditions with modern exoskeleton enhancements." },
    { id: 103, type: "close", name: "Mechanized Infantry", power: 6, ability: "Medic", lore: "These advanced combat suits can be airdropped into the fiercest fights, where their pilots provide crucial support and firepower." },
    { id: 104, type: "close", name: "Exo-Soldier", power: 8, ability: "Agile", lore: "Exo-Soldiers wear suits powered by miniaturized fusion reactors, making them formidable assets in any engagement zone." },
    { id: 105, type: "close", name: "Captain Elise Durant", power: 10, ability: "Hero", lore: "Captain Durant, a legendary pilot known for her daring maneuvers in close-quarters space combat, has now brought her expertise to the ground forces." },
    // Human Faction - Ranged Combat
    { id: 111, type: "range", name: "Tactical Sniper", power: 7, ability: "Scorch", lore: "Equipped with adaptive camouflage and high-velocity railguns, Tactical Snipers can change the tide of war from kilometers away." },
    { id: 112, type: "range", name: "Recon Drone", power: 4, ability: "Spy", lore: "Recon Drones silently gather critical battlefield intelligence, often turning invisible to enemy sensors." },
    { id: 113, type: "range", name: "Artillery Specialist", power: 6, ability: "Muster", lore: "Artillery Specialists control the battlefield with precise long-range bombardments, decimating enemy fortifications from afar." },
    { id: 114, type: "range", name: "Comms Officer", power: 5, ability: "Morale Boost", lore: "Comms Officers maintain the flow of vital information across the battlefield, boosting the morale and coordination of allied troops." },
    { id: 115, type: "range", name: "Lieutenant Marcus Fenix", power: 9, ability: "Hero", lore: "Marcus Fenix, a master sharpshooter, once turned the tide of a siege with a single shot that saved a thousand lives." },
    // Human Faction - Siege
    { id: 121, type: "siege", name: "Siege Mech", power: 8, ability: "Medic", lore: "Siege Mechs are the heavy hitters in sieges, capable of breaking through any fortification with their massive firepower." },
    { id: 122, type: "siege", name: "Drone Carrier", power: 7, ability: "Muster", lore: "Drone Carriers deploy swarms of combat drones, overwhelming opponents with sheer numbers." },
    { id: 123, type: "siege", name: "Engineer Unit", power: 5, ability: "Tight Bond", lore: "Engineer Units are essential for maintaining and upgrading battlefield tech in real-time, ensuring peak performance under fire." },
    { id: 124, type: "siege", name: "Orbital Strike", power: 9, ability: "Destroy a row", lore: "Orbital Strikes are the ultimate deterrence, called down from space stations orbiting above the conflict zone, devastating enemy lines from above." },
    { id: 125, type: "siege", name: "Engineer Sophia Bell", power: 11, ability: "Hero", lore: "Sophia Bell, chief engineer of the star fleet's artillery division, designs weapons that can break through any fortification." },
    // Human Faction - Leader
    { id: 131, type: "leader", name: "Admiral Elara Myles", power: 12, ability: "Call Reinforcements", lore: "Admiral Elara Myles commands the human fleet with an iron will and a sharp mind, turning the tides of war with her strategic genius." },
    { id: 132, type: "leader", name: "General Carter Blake", power: 12, ability: "Orbital Bombardment", lore: "General Carter Blake, a seasoned war hero, coordinates devastating orbital strikes, breaking enemy lines with precision." },
  ];

const DeckBuilder: React.FC = () => {
  const [deck, setDeck] = useState<CardData[]>([]);
  const [availableCards, setAvailableCards] = useState<CardData[]>(cardPool);

  const addToDeck = (cardId: number) => {
    const card = availableCards.find(card => card.id === cardId);
    if (card) {
      setDeck([...deck, card]);
      setAvailableCards(availableCards.filter(c => c.id !== cardId));
    }
  };

  const removeFromDeck = (cardId: number) => {
    const card = deck.find(card => card.id === cardId);
    if (card) {
      setAvailableCards([...availableCards, card]);
      setDeck(deck.filter(c => c.id !== cardId));
    }
  };

  return (
    <div>
      <h1>Deck Builder</h1>
      <div>
        <h2>Your Deck</h2>
        {deck.map(card => (
          <div key={card.id} onClick={() => removeFromDeck(card.id)}>
            <Card
              id={card.id}
              name={card.name}
              power={card.power}
              ability={card.ability}
              type={card.type}
              lore={card.lore}
              onPlay={() => removeFromDeck(card.id)}
            />
          </div>
        ))}
        {deck.length === 0 && <p>No cards in your deck. Click on a card below to add it.</p>}
      </div>
      <div>
        <h2>Available Cards</h2>
        {availableCards.map(card => (
          <div key={card.id} onClick={() => addToDeck(card.id)}>
            <Card
              id={card.id}
              name={card.name}
              power={card.power}
              ability={card.ability}
              type={card.type}
              lore={card.lore}
              onPlay={() => addToDeck(card.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeckBuilder;

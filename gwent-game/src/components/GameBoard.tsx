import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Card from './Card';
import { CardData, cardPool } from './cardData';

type CardType = 'Close Combat' | 'Ranged Combat' | 'Siege' | 'Leader' | 'Weather';

interface Scores {
  player: number;
  ai: number;
}

interface PlayedCards {
  [key: string]: CardData[];
}

const GameBoard: React.FC = () => {
  const [playerCardsInHand, setPlayerCardsInHand] = useState<CardData[]>([]);
  const [aiCardsInHand, setAICardsInHand] = useState<CardData[]>([]);
  const [playerRemainingCards, setPlayerRemainingCards] = useState<CardData[]>([]);
  const [aiRemainingCards, setAIRemainingCards] = useState<CardData[]>([]);
  const [playerPlayedCards, setPlayerPlayedCards] = useState<PlayedCards>({});
  const [aiPlayedCards, setAIPlayedCards] = useState<PlayedCards>({});
  const [scores, setScores] = useState<Scores>({ player: 0, ai: 0 });
  const [playerWins, setPlayerWins] = useState(0);
  const [aiWins, setAIWins] = useState(0);
  const [currentRound, setCurrentRound] = useState(1);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [playerPassed, setPlayerPassed] = useState(false);
  const [aiPassed, setAIPassed] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('userDeck') || !localStorage.getItem('userLeader')) {
      alert('You must have exactly 20 cards and a leader card in your deck to play the game.');
      navigate('/');
      return;
    }
    setupGame();
  }, []);

  useEffect(() => {
    if (!isPlayerTurn && !aiPassed) {
      setTimeout(aiPlayCard, 1000);
    }
    checkRoundEnd();
  }, [isPlayerTurn, aiPassed, playerPassed]);

  const setupGame = () => {
    const loadedDeck = JSON.parse(localStorage.getItem('userDeck') || '[]');
    const loadedLeader = JSON.parse(localStorage.getItem('userLeader') || '{}');
    const { leader: aiLeaderCard, deck: aiDeckCards } = getAIDeck();

    // Initial card distribution for each round
    const initialCardCount = currentRound === 1 ? 11 : 7; // 11 for first round, 7 for subsequent rounds
    const shuffledPlayerDeck = shuffle([...playerRemainingCards, loadedLeader, ...loadedDeck]);
    const shuffledAIDeck = shuffle([...aiRemainingCards, aiLeaderCard, ...aiDeckCards]);

    setPlayerCardsInHand(shuffledPlayerDeck.slice(0, initialCardCount));
    setPlayerRemainingCards(shuffledPlayerDeck.slice(initialCardCount));
    setAICardsInHand(shuffledAIDeck.slice(0, initialCardCount))
    setAIRemainingCards(shuffledAIDeck.slice(initialCardCount));
    resetPlayedCards();
    setPlayerPassed(false);
    setAIPassed(false);
    setIsPlayerTurn(currentRound % 2 === 0);  // AI starts on even rounds
  };

  const getAIDeck = () => {
    // AI deck selection logic
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

  const playCard = (cardId: number) => {
    if (!isPlayerTurn || playerPassed) return;

    const cardIndex = playerCardsInHand.findIndex(card => card.id === cardId);
    if (cardIndex > -1) {
      const card = playerCardsInHand.splice(cardIndex, 1)[0];
      setPlayerPlayedCards(prev => ({
        ...prev,
        [card.type]: [...(prev[card.type] || []), card]
      }));
      updateScores(card.power);
      setIsPlayerTurn(false);
    }
  };

  const aiPlayCard = () => {
    if (aiCardsInHand.length > 0 && !aiPassed) {
      const card = aiCardsInHand.shift();
      if (card) {
        setAIPlayedCards(prev => ({
          ...prev,
          [card.type]: [...(prev[card.type] || []), card]
        }));
        updateScores(card.power, false);
        if (playerPassed && scores.ai > scores.player) {
          aiPass(); // AI passes if it's ahead in points after the player has passed
        } else {
          setIsPlayerTurn(true);
        }
      }
    } else {
      aiPass();
    }
  };

  const updateScores = (points: number, isPlayer: boolean = true) => {
    if (isPlayer) {
      setScores(prev => ({ ...prev, player: prev.player + points }));
    } else {
      setScores(prev => ({ ...prev, ai: prev.ai + points }));
    }
  };

  const resetPlayedCards = () => {
    setPlayerPlayedCards({
      'Close Combat': [],
      'Ranged Combat': [],
      Siege: [],
      Leader: [],
      Weather: []
    });
    setAIPlayedCards({
      'Close Combat': [],
      'Ranged Combat': [],
      Siege: [],
      Leader: [],
      Weather: []
    });
  };

  const playerPass = () => {
    setPlayerPassed(true);
    setIsPlayerTurn(false);
  };

  const aiPass = () => {
    setAIPassed(true);
    setIsPlayerTurn(true);
  };

  const checkRoundEnd = () => {
    if (playerPassed && aiPassed) {
      endRound();
    }
  };

  const endRound = () => {
    const playerScore = scores.player;
    const aiScore = scores.ai;
    let message = `Round ${currentRound} ended. Player: ${playerScore}, AI: ${aiScore}. `;
    
    if (playerScore > aiScore) {
      setPlayerWins(playerWins + 1);
      message += "Player wins the round!";
    } else if (playerScore < aiScore) {
      setAIWins(aiWins + 1);
      message += "AI wins the round!";
    } else {
      message += "Round drawn.";
    }
    
    alert(message);
    if (playerWins === 2 || aiWins === 2 || currentRound === 3) {
      concludeGame();
    } else {
      setCurrentRound(currentRound + 1);
      setupGame();
    }
  };

  const concludeGame = () => {
    const finalMessage = playerWins > aiWins ? "Player wins the game!" :
                         aiWins > playerWins ? "AI wins the game!" : "Game is a draw!";
    alert(finalMessage);
    navigate('/');
  };

  return (
    <div>
      <h1>Game Board</h1>
      <h2>Round {currentRound}</h2>
      <div>
        {playerCardsInHand.map(card => (
          <Card key={card.id} {...card} onPlay={() => playCard(card.id)} />
        ))}
        <button onClick={playerPass} disabled={playerPassed}>Pass Turn</button>
      </div>
      {(['Close Combat', 'Ranged Combat', 'Siege', 'Leader', 'Weather'] as CardType[]).map(type => (
        <div key={type}>
          <h3>{type} Cards - Player</h3>
          {playerPlayedCards[type]?.map(card => <Card key={card.id} {...card} onPlay={() => {}} />)}
          <h3>{type} Cards - AI</h3>
          {aiPlayedCards[type]?.map(card => <Card key={card.id} {...card} onPlay={() => {}} />)}
        </div>
      ))}
      <div style={{ marginTop: '20px' }}>
        <Link to="/">Exit</Link>
      </div>
    </div>
  );
};

export default GameBoard;

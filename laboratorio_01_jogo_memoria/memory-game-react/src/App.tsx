import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import Card from './components/Card';
import { shuffleArray } from './utils';

// Types
interface CardType {
  id: number;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const App = () => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [flippedCards, setFlippedCards] = useState<CardType[]>([]);
  const [isGameOver, setIsGameOver] = useState(false);

  // Initialize game
  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const cardValues = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];
    const cards: CardType[] = [...cardValues, ...cardValues].map((value, index) => ({
      id: index,
      value,
      isFlipped: false,
      isMatched: false,
    }));

    setCards(shuffleArray(cards));
    setScore(0);
    setFlippedCards([]);
    setIsGameOver(false);
  };

  const handleCardClick = (clickedCard: CardType) => {
    if (flippedCards.length === 2 || clickedCard.isFlipped || clickedCard.isMatched) return;

    const newCards = cards.map(card =>
      card.id === clickedCard.id ? { ...card, isFlipped: true } : card
    );
    setCards(newCards);

    const newFlippedCards = [...flippedCards, clickedCard];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      if (newFlippedCards[0].value === newFlippedCards[1].value) {
        setCards(prevCards => 
          prevCards.map(card => 
            card.id === newFlippedCards[0].id || card.id === newFlippedCards[1].id
              ? { ...card, isMatched: true, isFlipped: true }
              : card
          )
        );
        setScore(prev => {
          const newScore = prev + 10;
          if (newScore > highScore) setHighScore(newScore);
          return newScore;
        });
        setFlippedCards([]);

        const allMatched = cards.every(card => 
          card.isMatched || 
          card.id === newFlippedCards[0].id || 
          card.id === newFlippedCards[1].id
        );
        if (allMatched) setIsGameOver(true);
      } else {
        setTimeout(() => {
          setCards(prevCards =>
            prevCards.map(card =>
              (card.id === newFlippedCards[0].id || card.id === newFlippedCards[1].id) && !card.isMatched
                ? { ...card, isFlipped: false }
                : card
            )
          );
          setFlippedCards([]);
          setScore(prev => Math.max(0, prev - 1));
        }, 1000);
      }
    }
  };

  return (
    <GameContainer>
      <GameHeader>
        <h1>Jogo da Memória</h1>
        <ScoreContainer>
          <Score>Pontuação: {score}</Score>
          <HighScore>Recorde: {highScore}</HighScore>
        </ScoreContainer>
        <RestartButton onClick={initializeGame}>Reiniciar Jogo</RestartButton>
      </GameHeader>
      
      <GameBoard>
        {cards.map(card => (
          <Card
            key={card.id}
            card={card}
            onClick={() => handleCardClick(card)}
          />
        ))}
      </GameBoard>

      {isGameOver && (
        <VictoryOverlay>
          <VictoryMessage>
            <h2>Parabéns! Você venceu! 🎉</h2>
            <p>Você encontrou todos os pares!</p>
            {score === highScore && (
              <NewRecord>Novo Recorde! 🏆</NewRecord>
            )}
            <RestartButton onClick={initializeGame}>Jogar Novamente</RestartButton>
          </VictoryMessage>
        </VictoryOverlay>
      )}
    </GameContainer>
  );
};

const GameContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  position: relative;
`;

const GameHeader = styled.div`
  text-align: center;
  margin-bottom: 20px;

  h1 {
    color: #333;
    margin-bottom: 10px;
  }
`;

const ScoreContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 10px;
`;

const Score = styled.div`
  font-size: 1.5em;
`;

const HighScore = styled.div`
  font-size: 1.5em;
  color: #4CAF50;
`;

const RestartButton = styled.button`
  padding: 10px 20px;
  font-size: 1.1em;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }
`;

const GameBoard = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  justify-items: center;
  margin-top: 20px;
`;

const VictoryOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const VictoryMessage = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  text-align: center;
  animation: fadeIn 0.5s ease-out;

  h2 {
    color: #4CAF50;
    margin-bottom: 1rem;
  }

  p {
    margin-bottom: 1.5rem;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const NewRecord = styled.p`
  color: #ff9800;
  font-size: 1.2em;
  font-weight: bold;
  animation: pulse 1s infinite;

  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
  }
`;

export default App;

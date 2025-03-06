import styled from '@emotion/styled';

interface CardType {
  id: number;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
}

interface CardProps {
  card: CardType;
  onClick: () => void;
}

const Card = ({ card, onClick }: CardProps) => {
  return (
    <CardContainer onClick={onClick} isFlipped={card.isFlipped} isMatched={card.isMatched}>
      <CardInner isFlipped={card.isFlipped}>
        <CardFront />
        <CardBack>{card.value}</CardBack>
      </CardInner>
    </CardContainer>
  );
};

const CardContainer = styled.div<{ isFlipped: boolean; isMatched: boolean }>`
  width: 100px;
  height: 100px;
  perspective: 1000px;
  cursor: ${props => (props.isMatched ? 'default' : 'pointer')};
  opacity: ${props => (props.isMatched ? 0.6 : 1)};
`;

const CardInner = styled.div<{ isFlipped: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  transform: ${props => props.isFlipped ? 'rotateY(180deg)' : 'rotateY(0)'};
`;

const CardSide = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2em;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

const CardFront = styled(CardSide)`
  background: linear-gradient(135deg, #6e8efb, #4a6cf7);
`;

const CardBack = styled(CardSide)`
  background: white;
  transform: rotateY(180deg);
  border: 2px solid #4a6cf7;
`;

export default Card; 
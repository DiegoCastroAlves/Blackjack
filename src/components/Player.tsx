import { IPlayerProps } from '../interfaces/IPlayer';
import { CardType } from '../types/CardType';
import { Card } from './Card';
import './styles/player.styles.css';

export function Player({
  hand,
  handleHit,
  handleStand,
  role,
  gameStatus,
}: IPlayerProps) {
  return (
    <div>
      <h1>{role}</h1>
      <div className='hand-display'>
        {hand.map((card: CardType, index) => {
          if (role === 'Dealer' && !gameStatus.IsOver && index === 1) {
            return <Card suit={card.suit} value={card.value} role={false} />;
          }
          return <Card suit={card.suit} value={card.value} role={true} />;
        })}
      </div>
      {handleHit && <button onClick={handleHit}>Hit</button>}
      {handleStand && <button onClick={handleStand}>Stand</button>}
    </div>
  );
}

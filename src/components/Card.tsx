import { ICardProps } from '../interfaces/ICard';
import './styles/cards.styles.css';

export function Card({ suit, value, role }: ICardProps) {
  return (
    <div className='card-component'>
      <div className='card-body'>
        {!role ? (
          <div className='card-back'>
            <h3>Hidden</h3>
          </div>
        ) : (
          <div className='content'>
            <p className='header'>
              {value} {suit}
            </p>
            <p className='body'>{suit}</p>
            <p className='footer'>
              {suit} {value}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

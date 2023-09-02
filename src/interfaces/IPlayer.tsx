import { CardType } from '../types/CardType';
import { GameStatus } from '../types/GameStatusType';

export interface IPlayerProps {
  hand: CardType[];
  handleHit?: () => void;
  handleStand?: () => void;
  role: string;
  gameStatus: GameStatus;
}

import { GameWinner } from '../enum/Status';

export type GameStatus = {
  IsOver: boolean;
  Winner: GameWinner;
};

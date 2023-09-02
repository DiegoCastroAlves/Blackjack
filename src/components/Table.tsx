import GameClass from '../Utils/GameClass';
import { useEffect, useState } from 'react';
import { CardType } from '../types/CardType';
import { Player } from './Player';
import { Players } from '../enum/Names.ts';

export function Table() {
  const [game] = useState<GameClass>(new GameClass());
  const [playerHand, setPlayerHand] = useState<CardType[]>([]);

  useEffect(() => {
    setPlayerHand(game.getPlayerHand());
  }, [game]);

  const updatePlayerHand = () => {
    const updatedPlayerHand = [...game.getPlayerHand()];
    setPlayerHand(updatedPlayerHand);
  };

  const handleHit = () => {
    game.hit();
    updatePlayerHand();
  };
  const handleStand = () => {
    game.stand();
    updatePlayerHand();
  };

  return (
    <>
      <Player
        hand={game.getDealerHand()}
        role={Players.Dealer}
        gameStatus={game.getGameStatus()}
      />
      <Player
        hand={playerHand}
        handleHit={handleHit}
        handleStand={handleStand}
        role={Players.Player}
        gameStatus={game.getGameStatus()}
      />
    </>
  );
}

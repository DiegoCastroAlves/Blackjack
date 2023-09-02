import { Card } from './Card';
import GameClass from '../Utils/GameClass';
import { useEffect, useState } from 'react';
import { CardType } from '../types/CardType';

export function Table() {
  const [game] = useState<GameClass>(new GameClass());
  const [playerHand, setPlayerHand] = useState<CardType[]>([]);

  useEffect(() => {
    setPlayerHand(game.getPlayerHand());
  }, [game]);

  const handleHit = () => {
    game.hit();
    const updatedPlayerHand = [...game.getPlayerHand()];
    setPlayerHand(updatedPlayerHand);
  };

  return (
    <>
      <Card />
      {playerHand.map((card: CardType, index) => (
        <p key={index}>{`${card.value} - ${card.suit}`}</p>
      ))}

      <button type='button' onClick={handleHit}>
        Hit
      </button>
    </>
  );
}

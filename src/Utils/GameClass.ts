import { GameWinner } from '../enum/Status';
import { CardType } from '../types/CardType';
import { Dealer } from '../types/DealerType';
import { GameStatus } from '../types/GameStatusType';
import { Player } from '../types/PlayerType';
import DeckClass from './DeckClass';

class GameClass {
  private deck: DeckClass;
  private dealer: Dealer;
  private player: Player;
  private gameStatus: GameStatus;

  constructor() {
    this.deck = new DeckClass();
    this.dealer = {
      Hand: [],
      Score: 0,
    };
    this.player = {
      Hand: [],
      Score: 0,
    };
    this.gameStatus = {
      IsOver: false,
      Winner: GameWinner.Undetermined,
    };
    this.startGame();
  }

  private checkWinner(): void {
    const dealerScore = this.getDealerScore();
    const playerScore = this.getPlayerScore();

    if (this.gameStatus.IsOver) {
      if (dealerScore > 21) {
        this.gameStatus.Winner = GameWinner.Player;
      }

      if (playerScore > 21) {
        this.gameStatus.Winner = GameWinner.Dealer;
      }

      if (dealerScore === playerScore) {
        this.gameStatus.Winner = GameWinner.Draw;
      }

      if (dealerScore > playerScore) {
        this.gameStatus.Winner = GameWinner.Dealer;
      }
    }
  }

  private dealCards(): void {
    for (let i = 0; i < 2; i++) {
      this.dealer.Hand.push(this.deck.drawCard());
      this.player.Hand.push(this.deck.drawCard());
    }
  }

  private getDealerScore(): number {
    return this.calculateScore(this.dealer.Hand);
  }

  private getPlayerScore(): number {
    if (this.calculateScore(this.player.Hand) === 21) {
      this.gameStatus.IsOver = true;
      this.checkWinner();
    }

    return this.calculateScore(this.player.Hand);
  }

  private calculateScore(hand: CardType[]): number {
    let score = 0;
    let numAces = 0;

    for (const card of hand) {
      const value = card.value === 'A' ? 11 : Number(card.value) || 10;
      score += value;

      if (card.value === 'A') {
        numAces++;
      }

      while (score > 21 && numAces > 0) {
        score -= 10;
        numAces--;
      }
    }

    return score;
  }

  public hit(): void {
    if (!this.gameStatus.IsOver) {
      this.player.Hand.push(this.deck.drawCard());

      if (this.getPlayerScore() > 21) {
        this.gameStatus.IsOver = true;
        this.checkWinner();
      }
    }
  }

  public stand(): void {
    if (!this.gameStatus.IsOver) {
      while (this.getDealerScore() < 17) {
        console.log('Dealer hits');

        this.dealer.Hand.push(this.deck.drawCard());
      }

      this.gameStatus.IsOver = true;
      this.checkWinner();
    }
  }

  public getDealerHand(): CardType[] {
    return this.dealer.Hand;
  }

  public getPlayerHand(): CardType[] {
    return this.player.Hand;
  }

  private startGame(): void {
    if (!this.deck.hasCards()) {
      this.deck = new DeckClass();
    }
    this.dealCards();
    this.getDealerScore();
    this.getPlayerScore();
  }

  public getGameStatus(): GameStatus {
    return this.gameStatus;
  }
}

export default GameClass;

import { Status } from '../enum/Status';
import { CardType } from '../types/CardType';
import DeckClass from './DeckClass';

class GameClass {
  private deck: DeckClass;
  private dealerHand: CardType[] = [];
  private playerHand: CardType[] = [];
  private isGameOver: boolean = false;

  constructor() {
    this.deck = new DeckClass();
    this.startGame();
  }

  private checkWinner(): string | void {
    const dealerScore = this.getDealerScore();
    const playerScore = this.getPlayerScore();

    if (this.isGameOver) {
      if (dealerScore > 21) {
        return Status.WIN;
      }

      if (playerScore > 21) {
        return Status.LOSE;
      }

      if (dealerScore === playerScore) {
        return Status.DRAW;
      }

      if (dealerScore > playerScore) {
        return Status.LOSE;
      }
      return Status.WIN;
    }
  }

  private dealCards(): void {
    for (let i = 0; i < 2; i++) {
      this.dealerHand.push(this.deck.drawCard());
      this.playerHand.push(this.deck.drawCard());
    }
  }

  private getDealerScore(): number {
    return this.calculateScore(this.dealerHand);
  }

  private getPlayerScore(): number {
    if (this.calculateScore(this.playerHand) === 21) {
      this.isGameOver = true;
      this.checkWinner();
    }

    return this.calculateScore(this.playerHand);
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
    if (!this.isGameOver) {
      this.playerHand.push(this.deck.drawCard());

      if (this.getPlayerScore() > 21) {
        this.isGameOver = true;
        this.checkWinner();
      }
    }
  }

  public stand(): void {
    if (!this.isGameOver) {
      while (this.getDealerScore() < 17) {
        this.dealerHand.push(this.deck.drawCard());
      }

      this.isGameOver = true;
      this.checkWinner();
    }
  }

  public getDealerHand(): CardType[] {
    return this.dealerHand;
  }

  public getPlayerHand(): CardType[] {
    return this.playerHand;
  }

  private startGame(): void {
    if (!this.deck.hasCards()) {
      this.deck = new DeckClass();
    }
    this.dealCards();
    this.getDealerScore();
    this.getPlayerScore();
  }
}

export default GameClass;

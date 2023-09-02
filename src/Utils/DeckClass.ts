import { CardType } from '../types/CardType';

class DeckClass {
  private cards: CardType[] = [];

  constructor() {
    for (let i = 0; i < 2; i++) {
      this.createDeck();
    }
    this.shuffleDeck();
  }

  private shuffleDeck(): void {
    const { cards } = this;
    let count = cards.length,
      temporary,
      index;

    while (count) {
      index = Math.floor(Math.random() * count--);
      temporary = cards[count];
      cards[count] = cards[index];
      cards[index] = temporary;
    }
  }

  private createDeck(): void {
    const suits = ['spades', 'hearts', 'diamonds', 'clubs'];
    const values = [
      'A',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      'J',
      'Q',
      'K',
    ];

    for (const suit of suits) {
      for (const value of values) {
        this.cards.push({ suit, value });
      }
    }
  }

  public drawCard(): CardType {
    return this.cards.pop()!;
  }

  public hasCards(): boolean {
    return this.cards.length > 10;
  }
}

export default DeckClass;

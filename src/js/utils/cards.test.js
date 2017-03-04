import _ from 'lodash';
import {
  generateDeck,
  suitOrder,
  rankOrder,
  cardEqual,
  pointsForCard,
  determineWinningPlayerForTrick,
  pointsForPlayer,
} from './cards';

describe('generateDeck', () => {
  it('should generate a shuffled deck with all cards', () => {
    const deck = generateDeck(true);
    expect(deck.length).toBe(52);
    expect(_.filter(deck, (card) => card.suit === 'Diamonds').length).toBe(13);
    expect(_.filter(deck, (card) => card.suit === 'Clubs').length).toBe(13);
    expect(_.filter(deck, (card) => card.suit === 'Hearts').length).toBe(13);
    expect(_.filter(deck, (card) => card.suit === 'Spades').length).toBe(13);
    expect(_.filter(deck, (card) => card.rank === '2').length).toBe(4);
    expect(_.filter(deck, (card) => card.rank === '3').length).toBe(4);
    expect(_.filter(deck, (card) => card.rank === '4').length).toBe(4);
    expect(_.filter(deck, (card) => card.rank === '5').length).toBe(4);
    expect(_.filter(deck, (card) => card.rank === '6').length).toBe(4);
    expect(_.filter(deck, (card) => card.rank === '7').length).toBe(4);
    expect(_.filter(deck, (card) => card.rank === '8').length).toBe(4);
    expect(_.filter(deck, (card) => card.rank === '9').length).toBe(4);
    expect(_.filter(deck, (card) => card.rank === '10').length).toBe(4);
    expect(_.filter(deck, (card) => card.rank === 'J').length).toBe(4);
    expect(_.filter(deck, (card) => card.rank === 'Q').length).toBe(4);
    expect(_.filter(deck, (card) => card.rank === 'K').length).toBe(4);
    expect(_.filter(deck, (card) => card.rank === 'A').length).toBe(4);
  });
});

describe('suitOrder', () => {
  it('should return the correct suitOrder', () => {
    expect(suitOrder('Clubs')).toBe(0);
    expect(suitOrder('Diamonds')).toBe(1);
    expect(suitOrder('Spades')).toBe(2);
    expect(suitOrder('Hearts')).toBe(3);
  });
});

describe('rankOrder', () => {
  it('should return the correct rankOrder', () => {
    expect(rankOrder('2')).toBe(2);
    expect(rankOrder('3')).toBe(3);
    expect(rankOrder('4')).toBe(4);
    expect(rankOrder('5')).toBe(5);
    expect(rankOrder('6')).toBe(6);
    expect(rankOrder('7')).toBe(7);
    expect(rankOrder('8')).toBe(8);
    expect(rankOrder('9')).toBe(9);
    expect(rankOrder('10')).toBe(10);
    expect(rankOrder('J')).toBe(11);
    expect(rankOrder('Q')).toBe(12);
    expect(rankOrder('K')).toBe(13);
    expect(rankOrder('A')).toBe(14);
    expect(rankOrder('A', false)).toBe(1);
  });
});

describe('cardEqual', () => {
  it('should determine card equality', () => {
    expect(cardEqual({ suit: 'Spades', rank: '3' }, { suit: 'Spades', rank: '3' })).toBe(true);
    expect(cardEqual({ suit: 'Hearts', rank: '3' }, { suit: 'Hearts', rank: '3' })).toBe(true);
    expect(cardEqual({ suit: 'Diamonds', rank: '3' }, { suit: 'Diamonds', rank: '3' })).toBe(true);
    expect(cardEqual({ suit: 'Spades', rank: '3' }, { suit: 'Spades', rank: '3' })).toBe(true);
  });
});

describe('pointsForCard', () => {
  it('should return correct points for cards of Hearts suit', () => {
    expect(pointsForCard({ suit: 'Hearts', rank: '2' })).toBe(1);
    expect(pointsForCard({ suit: 'Hearts', rank: '3' })).toBe(1);
    expect(pointsForCard({ suit: 'Hearts', rank: '4' })).toBe(1);
    expect(pointsForCard({ suit: 'Hearts', rank: '5' })).toBe(1);
    expect(pointsForCard({ suit: 'Hearts', rank: '6' })).toBe(1);
    expect(pointsForCard({ suit: 'Hearts', rank: '7' })).toBe(1);
    expect(pointsForCard({ suit: 'Hearts', rank: '8' })).toBe(1);
    expect(pointsForCard({ suit: 'Hearts', rank: '9' })).toBe(1);
    expect(pointsForCard({ suit: 'Hearts', rank: '10' })).toBe(1);
    expect(pointsForCard({ suit: 'Hearts', rank: 'J' })).toBe(1);
    expect(pointsForCard({ suit: 'Hearts', rank: 'Q' })).toBe(1);
    expect(pointsForCard({ suit: 'Hearts', rank: 'K' })).toBe(1);
    expect(pointsForCard({ suit: 'Hearts', rank: 'A' })).toBe(1);
  });

  it('should return correct points for cards of Spades suit', () => {
    expect(pointsForCard({ suit: 'Spades', rank: '2' })).toBe(0);
    expect(pointsForCard({ suit: 'Spades', rank: '3' })).toBe(0);
    expect(pointsForCard({ suit: 'Spades', rank: '4' })).toBe(0);
    expect(pointsForCard({ suit: 'Spades', rank: '5' })).toBe(0);
    expect(pointsForCard({ suit: 'Spades', rank: '6' })).toBe(0);
    expect(pointsForCard({ suit: 'Spades', rank: '7' })).toBe(0);
    expect(pointsForCard({ suit: 'Spades', rank: '8' })).toBe(0);
    expect(pointsForCard({ suit: 'Spades', rank: '9' })).toBe(0);
    expect(pointsForCard({ suit: 'Spades', rank: '10' })).toBe(0);
    expect(pointsForCard({ suit: 'Spades', rank: 'J' })).toBe(0);
    expect(pointsForCard({ suit: 'Spades', rank: 'Q' })).toBe(13);
    expect(pointsForCard({ suit: 'Spades', rank: 'K' })).toBe(0);
    expect(pointsForCard({ suit: 'Spades', rank: 'A' })).toBe(0);
  });

  it('should return correct points for cards of other suits', () => {
    expect(pointsForCard({ suit: 'Diamonds', rank: '2' })).toBe(0);
    expect(pointsForCard({ suit: 'Diamonds', rank: '3' })).toBe(0);
    expect(pointsForCard({ suit: 'Diamonds', rank: '4' })).toBe(0);
    expect(pointsForCard({ suit: 'Diamonds', rank: '5' })).toBe(0);
    expect(pointsForCard({ suit: 'Diamonds', rank: '6' })).toBe(0);
    expect(pointsForCard({ suit: 'Diamonds', rank: '7' })).toBe(0);
    expect(pointsForCard({ suit: 'Diamonds', rank: '8' })).toBe(0);
    expect(pointsForCard({ suit: 'Diamonds', rank: '9' })).toBe(0);
    expect(pointsForCard({ suit: 'Diamonds', rank: '10' })).toBe(0);
    expect(pointsForCard({ suit: 'Diamonds', rank: 'J' })).toBe(0);
    expect(pointsForCard({ suit: 'Diamonds', rank: 'Q' })).toBe(0);
    expect(pointsForCard({ suit: 'Diamonds', rank: 'K' })).toBe(0);
    expect(pointsForCard({ suit: 'Diamonds', rank: 'A' })).toBe(0);
    expect(pointsForCard({ suit: 'Clubs', rank: '2' })).toBe(0);
    expect(pointsForCard({ suit: 'Clubs', rank: '3' })).toBe(0);
    expect(pointsForCard({ suit: 'Clubs', rank: '4' })).toBe(0);
    expect(pointsForCard({ suit: 'Clubs', rank: '5' })).toBe(0);
    expect(pointsForCard({ suit: 'Clubs', rank: '6' })).toBe(0);
    expect(pointsForCard({ suit: 'Clubs', rank: '7' })).toBe(0);
    expect(pointsForCard({ suit: 'Clubs', rank: '8' })).toBe(0);
    expect(pointsForCard({ suit: 'Clubs', rank: '9' })).toBe(0);
    expect(pointsForCard({ suit: 'Clubs', rank: '10' })).toBe(0);
    expect(pointsForCard({ suit: 'Clubs', rank: 'J' })).toBe(0);
    expect(pointsForCard({ suit: 'Clubs', rank: 'Q' })).toBe(0);
    expect(pointsForCard({ suit: 'Clubs', rank: 'K' })).toBe(0);
    expect(pointsForCard({ suit: 'Clubs', rank: 'A' })).toBe(0);
  });
});

describe('sortCards', () => {
  it('should sort the cards correctly', () => {
    // TODO;
    expect(true).toBe(true);
  });
});

describe('removeCardFromCards', () => {
  it('should removeCardFromCards correctly', () => {
    // TODO;
    expect(true).toBe(true);
  });
});

describe('determineWinningPlayerForTrick', () => {
  it('should return the correct winning player for same suit', () => {
    const cards = [
      { byPlayer: '1', card: { suit: 'Spades', rank: '3' }},
      { byPlayer: '2', card: { suit: 'Spades', rank: '10' }},
      { byPlayer: '3', card: { suit: 'Spades', rank: 'A' }},
      { byPlayer: '4', card: { suit: 'Spades', rank: '4' }},
    ];
    expect(determineWinningPlayerForTrick({ ledByPlayer: '1', cards })).toBe('3');
    expect(determineWinningPlayerForTrick({ ledByPlayer: '2', cards })).toBe('3');
    expect(determineWinningPlayerForTrick({ ledByPlayer: '3', cards })).toBe('3');
    expect(determineWinningPlayerForTrick({ ledByPlayer: '4', cards })).toBe('3');
  });

  it('should return the correct winning player for entirely mixed suit', () => {
    const cards = [
      { byPlayer: '1', card: { suit: 'Hearts', rank: '3' }},
      { byPlayer: '2', card: { suit: 'Spades', rank: '10' }},
      { byPlayer: '3', card: { suit: 'Diamond', rank: 'A' }},
      { byPlayer: '4', card: { suit: 'Clubs', rank: '4' }},
    ];
    expect(determineWinningPlayerForTrick({ ledByPlayer: '1', cards })).toBe('1');
    expect(determineWinningPlayerForTrick({ ledByPlayer: '2', cards })).toBe('2');
    expect(determineWinningPlayerForTrick({ ledByPlayer: '3', cards })).toBe('3');
    expect(determineWinningPlayerForTrick({ ledByPlayer: '4', cards })).toBe('4');
  });

  it('should return the correct winning player for partial mixed suit', () => {
    const cards = [
      { byPlayer: '1', card: { suit: 'Hearts', rank: '3' }},
      { byPlayer: '2', card: { suit: 'Hearts', rank: '10' }},
      { byPlayer: '3', card: { suit: 'Diamond', rank: 'A' }},
      { byPlayer: '4', card: { suit: 'Diamond', rank: '4' }},
    ];
    expect(determineWinningPlayerForTrick({ ledByPlayer: '1', cards })).toBe('2');
    expect(determineWinningPlayerForTrick({ ledByPlayer: '2', cards })).toBe('2');
    expect(determineWinningPlayerForTrick({ ledByPlayer: '3', cards })).toBe('3');
    expect(determineWinningPlayerForTrick({ ledByPlayer: '4', cards })).toBe('3');
  });
});

describe('pointsForPlayer', () => {
  it('should count the points correctly', () => {
    expect(pointsForPlayer({
      wonTricks: [
        {
          cards: [
            { byPlayer: '1', card: { suit: 'Hearts', rank: '3' }},
            { byPlayer: '2', card: { suit: 'Hearts', rank: '10' }},
            { byPlayer: '3', card: { suit: 'Diamond', rank: 'A' }},
            { byPlayer: '4', card: { suit: 'Diamond', rank: '4' }},
          ],
        },
      ],
    })).toBe(2);
  });
});

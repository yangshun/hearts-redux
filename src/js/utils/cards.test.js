import _ from 'lodash';
import {
  generateDeck,
  suitOrder,
  rankOrder,
  determineWinningPlayerForTrick,
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
    expect(suitOrder('Diamonds')).toBe(0);
    expect(suitOrder('Clubs')).toBe(1);
    expect(suitOrder('Hearts')).toBe(3);
    expect(suitOrder('Spades')).toBe(2);
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

describe('determineWinningPlayerForTrick', () => {
  it('should return the correct winning player for same suit', () => {
    const cardsPlayed = [
      { byPlayer: '1', card: { suit: 'Spades', rank: '3' }},
      { byPlayer: '2', card: { suit: 'Spades', rank: '10' }},
      { byPlayer: '3', card: { suit: 'Spades', rank: 'A' }},
      { byPlayer: '4', card: { suit: 'Spades', rank: '4' }},
    ];
    expect(determineWinningPlayerForTrick({ ledByPlayer: '1', cardsPlayed })).toBe('3');
    expect(determineWinningPlayerForTrick({ ledByPlayer: '2', cardsPlayed })).toBe('3');
    expect(determineWinningPlayerForTrick({ ledByPlayer: '3', cardsPlayed })).toBe('3');
    expect(determineWinningPlayerForTrick({ ledByPlayer: '4', cardsPlayed })).toBe('3');
  });

  it('should return the correct winning player for entirely mixed suit', () => {
    const cardsPlayed = [
      { byPlayer: '1', card: { suit: 'Hearts', rank: '3' }},
      { byPlayer: '2', card: { suit: 'Spades', rank: '10' }},
      { byPlayer: '3', card: { suit: 'Diamond', rank: 'A' }},
      { byPlayer: '4', card: { suit: 'Clubs', rank: '4' }},
    ];
    expect(determineWinningPlayerForTrick({ ledByPlayer: '1', cardsPlayed })).toBe('1');
    expect(determineWinningPlayerForTrick({ ledByPlayer: '2', cardsPlayed })).toBe('2');
    expect(determineWinningPlayerForTrick({ ledByPlayer: '3', cardsPlayed })).toBe('3');
    expect(determineWinningPlayerForTrick({ ledByPlayer: '4', cardsPlayed })).toBe('4');
  });

  it('should return the correct winning player for partial mixed suit', () => {
    const cardsPlayed = [
      { byPlayer: '1', card: { suit: 'Hearts', rank: '3' }},
      { byPlayer: '2', card: { suit: 'Hearts', rank: '10' }},
      { byPlayer: '3', card: { suit: 'Diamond', rank: 'A' }},
      { byPlayer: '4', card: { suit: 'Diamond', rank: '4' }},
    ];
    expect(determineWinningPlayerForTrick({ ledByPlayer: '1', cardsPlayed })).toBe('2');
    expect(determineWinningPlayerForTrick({ ledByPlayer: '2', cardsPlayed })).toBe('2');
    expect(determineWinningPlayerForTrick({ ledByPlayer: '3', cardsPlayed })).toBe('3');
    expect(determineWinningPlayerForTrick({ ledByPlayer: '4', cardsPlayed })).toBe('3');
  });
});

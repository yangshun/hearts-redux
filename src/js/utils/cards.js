// @flow
import type { Suit, Rank, Card, Deck, PlayedCard, Trick, PlayerID } from 'types/hearts';

import _ from 'lodash';

export const NUMBER_OF_PLAYERS = 4;

export function generateDeck(shuffled: boolean = true): Deck {
  const deck: Array<Card> = [];
  const suits: Array<Suit> = ['Diamonds', 'Clubs', 'Hearts', 'Spades'];
  const ranks: Array<Rank> = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  suits.forEach((suit: Suit) => {
    ranks.forEach((rank: Rank) => {
      const card: Card = { suit, rank };
      deck.push(card);
    });
  });
  return shuffled ? _.shuffle(deck) : deck;
}

export function suitOrder(suit: Suit): number {
  return {
    Diamonds: 0,
    Clubs: 1,
    Hearts: 3,
    Spades: 2,
  }[suit];
}

export function rankOrder(rank: Rank, aceHigh: boolean = true): number {
  return {
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
    '10': 10,
    J: 11,
    Q: 12,
    K: 13,
    A: aceHigh ? 14 : 1,
  }[rank];
}

export function sortCards(cards: Array<Card>): Array<Card> {
  return cards.sort((a, b) => {
    return (suitOrder(a.suit) - suitOrder(b.suit)) || (rankOrder(a.rank) - rankOrder(b.rank));
  });
}

// Assumptions:
// - Every player has played a card.
// - There are no duplicate cards within that trick.
export function determineWinningPlayerForTrick(trick: Trick): PlayerID {
  if (trick.cardsPlayed.length !== NUMBER_OF_PLAYERS) {
    throw new Error('NotEnoughCardsPlayed');
  }

  const suitByLeadingPlayer: Suit = _.find(trick.cardsPlayed, (playedCard: PlayedCard) => {
    return playedCard.byPlayer === trick.ledByPlayer;
  }).card.suit;

  const cardsOfTheSameSuit: Array<PlayedCard> = trick.cardsPlayed
    .filter((playedCard: PlayedCard) => {
      return playedCard.card.suit === suitByLeadingPlayer;
    });

  const sortedCards: Array<PlayedCard> = cardsOfTheSameSuit.sort((a, b) => {
    return rankOrder(b.card.rank) - rankOrder(a.card.rank);
  });

  return _.first(sortedCards).byPlayer;
}

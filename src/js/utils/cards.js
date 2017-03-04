// @flow
import type { Suit, Rank, Card, Deck, PlayedCard, Trick, PlayerID, Player } from 'types/hearts';

import _ from 'lodash';

export const NUMBER_OF_PLAYERS = 4;
const POINTS_FOR_HEART_CARD = 1;
const POINTS_FOR_QUEEN_SPADES = 13;
const TWO_CLUBS: Card = { suit: 'Clubs', rank: '2' };
const QUEEN_SPADES: Card = { suit: 'Spades', rank: 'Q' };

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
    Clubs: 0,
    Diamonds: 1,
    Spades: 2,
    Hearts: 3,
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

export function cardEqual(card1: Card, card2: Card) {
  return card1.suit === card2.suit && card1.rank === card2.rank;
}

export function suitEqual(card: Card, suit: Suit) {
  return card.suit === suit;
}

export function rankEqual(card: Card, rank: Rank) {
  return card.rank === rank;
}

export function pointsForCard(card: Card): number {
  if (card.suit === 'Hearts') {
    return POINTS_FOR_HEART_CARD;
  }
  if (cardEqual(card, QUEEN_SPADES)) {
    return POINTS_FOR_QUEEN_SPADES;
  }
  return 0;
}

export function sortCards(cards: Array<Card>): Array<Card> {
  return cards.sort((a, b) => {
    return (suitOrder(a.suit) - suitOrder(b.suit)) || (rankOrder(a.rank) - rankOrder(b.rank));
  });
}

export function removeCardFromCards(cards: Array<Card>, cardToRemove: Card) {
  return cards.filter((card: Card) => {
    return !cardEqual(card, cardToRemove);
  });
}

export function cardsContainCard(cards: Array<Card>, targetCard: Card) {
  return !!_.find(cards, (card: Card) => {
    return cardEqual(card, targetCard);
  });
}

export function cardsContainSuit(cards: Array<Card>, targetSuit: Suit) {
  return !!_.find(cards, (card: Card) => {
    return suitEqual(card, targetSuit);
  });
}

// Assumptions:
// - Every player has played a card.
// - There are no duplicate cards within that trick.
export function determineWinningPlayerForTrick(trick: Trick): PlayerID {
  if (trick.cards.length !== NUMBER_OF_PLAYERS) {
    throw new Error('NotEnoughCardsPlayed');
  }

  const suitByLeadingPlayer: Suit = _.find(trick.cards, (playedCard: PlayedCard) => {
    return playedCard.byPlayer === trick.ledByPlayer;
  }).card.suit;

  const cardsOfTheSameSuit: Array<PlayedCard> = trick.cards
    .filter((playedCard: PlayedCard) => {
      return playedCard.card.suit === suitByLeadingPlayer;
    });

  const sortedCards: Array<PlayedCard> = cardsOfTheSameSuit.sort((a, b) => {
    return rankOrder(b.card.rank) - rankOrder(a.card.rank);
  });

  return _.first(sortedCards).byPlayer;
}

export function pointsForPlayer(player: Player): number {
  return _.reduce(player.wonTricks, (sum: number, trick: Trick) => {
    return sum + _.reduce(trick.cards, (sum2: number, playedCard: PlayedCard) => {
      return sum2 + pointsForCard(playedCard.card);
    }, 0);
  }, 0);
}

export function allowedToPlayCard(currentTrick: Trick, heartsBroken: boolean,
  cards: Array<Card>, targetCard: Card) {
  // Can only play Two of Clubs as first card on first trick.
  if (currentTrick.number === 0 &&
    currentTrick.cards.length === 0 &&
    cardsContainCard(cards, TWO_CLUBS)) {
    return cardEqual(targetCard, TWO_CLUBS);
  }

  // Lead a trick.
  if (currentTrick.cards.length === 0) {
    // If hearts broken, can start trick with any suit.
    if (heartsBroken) {
      return true;
    }

    // Can lead a trick with any suit except hearts if hearts not broken.
    if (!suitEqual(targetCard, 'Hearts')) {
      return true;
    }

    // Heart card played.
    const hasSpades = cardsContainSuit(cards, 'Spades');
    const hasDiamonds = cardsContainSuit(cards, 'Diamonds');
    const hasClubs = cardsContainSuit(cards, 'Clubs');
    // If have cards of other suits, can't play the heart card.
    if (hasSpades || hasDiamonds || hasClubs) {
      return false;
    }

    // Only hearts left.
    return true;
  }

  // Not leading a trick.
  const leadingCard = _.first(currentTrick.cards, (playedCard: PlayedCard) => {
    return playedCard.byPlayer === currentTrick.ledByPlayer;
  });
  const leadingSuit: Suit = leadingCard.card.suit;

  // Card same suit as leading card.
  if (suitEqual(targetCard, leadingSuit)) {
    return true;
  }

  const hasCardsOfLeadingSuit = cardsContainSuit(cards, leadingSuit);
  // No more cards of that suit, can throw that.
  return !hasCardsOfLeadingSuit;
}

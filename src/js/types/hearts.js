// @flow
export type PlayerID = number;
export type PlayerScores = {
  [id: PlayerID]: number,
};

export type Suit = 'Diamonds' | 'Clubs' | 'Hearts' | 'Spades';
export type Rank = '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K' | 'A';
export type Card = {
  suit: Suit,
  rank: Rank,
};
export type Deck = Array<Card>;

export type PlayedCard = {
  byPlayer: PlayerID,
  card: Card,
};

export type Trick = {
  number: number,
  ledByPlayer: PlayerID,
  currentPlayer: PlayerID,
  cards: Array<PlayedCard>,
};

export type Player = {
  cards: Array<Card>,
  wonTricks: Array<Trick>,
};

export type CurrentHand = {
  number: number,
  phase: 'EXCHANGE' | 'PLAY',
  orderOfPlay: Array<PlayerID>,
  heartsBroken: boolean,
  currentTrick: ?Trick,
  players: {
    [id: PlayerID]: Player,
  },
};

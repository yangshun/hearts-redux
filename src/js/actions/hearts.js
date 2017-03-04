// @flow
import type { FSA } from 'types/redux';
import type { Deck, Card, PlayerID } from 'types/hearts';

import _ from 'lodash';
import { NUMBER_OF_PLAYERS, generateDeck, sortCards } from 'utils/cards';

export const RESET_ALL = 'RESET_ALL';
export function resetAll(): FSA {
  return {
    type: RESET_ALL,
    payload: null,
  };
}

export const DEAL_CARDS = 'DEAL_CARDS';
export function dealCards(): FSA {
  const deck: Deck = generateDeck();
  return {
    type: DEAL_CARDS,
    payload: _.chunk(deck, deck.length / NUMBER_OF_PLAYERS).map(sortCards),
  };
}

export const START_HAND = 'START_HAND';
export function startHand(): FSA {
  return {
    type: START_HAND,
    payload: null,
  };
}

export const PLAYER_PLAY_CARD = 'PLAYER_PLAY_CARD';
export function playerPlayCard(playerID: PlayerID, card: Card): FSA {
  return {
    type: PLAYER_PLAY_CARD,
    payload: {
      playerID,
      card,
    },
  };
}

export const TRANSFER_SCORES = 'TRANSFER_SCORES';
export function transferScores(): FSA {
  return {
    type: TRANSFER_SCORES,
    payload: null,
  };
}

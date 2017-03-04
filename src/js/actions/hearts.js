// @flow
import type { FSA } from 'types/redux';
import type { Deck } from 'types/hearts';

import _ from 'lodash';
import { NUMBER_OF_PLAYERS, generateDeck, sortCards } from 'utils/cards';

export const DEAL_CARDS = 'DEAL_CARDS';
export function dealCards(): FSA {
  const deck: Deck = generateDeck();
  return {
    type: DEAL_CARDS,
    payload: _.chunk(deck, deck.length / NUMBER_OF_PLAYERS).map(sortCards),
  };
}

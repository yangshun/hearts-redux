// @flow
import type { FSA } from 'types/redux';
import type { CurrentHand } from 'types/hearts';

import _ from 'lodash';
import { NUMBER_OF_PLAYERS } from 'utils/cards';
import { DEAL_CARDS } from 'actions/hearts';

export const defaultState: CurrentHand = {
  number: 0,
  phase: 'EXCHANGE',
  orderOfPlay: [],
  heartsBroken: false,
  currentTrick: null,
  players: {},
};

function currentHand(state: CurrentHand = defaultState, action: FSA): CurrentHand {
  switch (action.type) {
    case DEAL_CARDS:
      {
        const players = {};
        _.range(NUMBER_OF_PLAYERS).forEach((number) => {
          players[number + 1] = {
            cards: action.payload[number],
            wonTricks: [],
          };
        });
        return {
          ...state,
          orderOfPlay: _.range(NUMBER_OF_PLAYERS).map(x => (x + 1).toString()),
          players,
        };
      }
    default:
      return state;
  }
}

export default currentHand;

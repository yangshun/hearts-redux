// @flow
import type { FSA } from 'types/redux';
import type { PlayerScores, PlayerID, Player, CurrentHand } from 'types/hearts';

import _ from 'lodash';
import {
  RESET_ALL,
  TRANSFER_SCORES,
} from 'actions/hearts';
import {
  pointsForPlayer,
} from 'utils/cards';

export const defaultState: PlayerScores = {};

function playerScores(state: PlayerScores = defaultState, action: FSA,
  currentHand: CurrentHand): PlayerScores {
  switch (action.type) {
    case RESET_ALL:
      return defaultState;
    case TRANSFER_SCORES:
      {
        const newState = _.cloneDeep(state);
        Object.keys(currentHand.players).forEach((number) => {
          const playerID: PlayerID = parseInt(number, 10);
          if (!newState[playerID]) {
            newState[playerID] = 0;
          }
          const player: Player = currentHand.players[playerID];
          newState[playerID] += pointsForPlayer(player);
        });
        return newState;
      }
    default:
      return state;
  }
}

export default playerScores;

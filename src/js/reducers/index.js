// @flow
import type { FSA } from 'types/redux';
import type { CurrentHand, PlayerScores } from 'types/hearts';

import { routerReducer } from 'react-router-redux';
import playerScores from 'reducers/player-scores';
import currentHand from 'reducers/current-hand';

export type StoreState = {
  playerScores: PlayerScores,
  currentHand: CurrentHand,
  routing: Object,
};

// $FlowFixMe: Delegate the individual reducer defaults to respective reducers.
export default function (state: StoreState = {}, action: FSA): StoreState {
  return {
    playerScores: playerScores(state.playerScores, action, state.currentHand),
    currentHand: currentHand(state.currentHand, action),
    routing: routerReducer(state.routing, action),
  };
}

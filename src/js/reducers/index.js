// @flow
import type { FSA } from 'types/redux';
import type { CurrentHand } from 'types/hearts';
import type { CounterState } from 'reducers/counter';

import { routerReducer } from 'react-router-redux';
import counter from 'reducers/counter';
import currentHand from 'reducers/current-hand';

export type StoreState = {
  counter: CounterState,
  currentHand: CurrentHand,
  routing: Object,
};

// $FlowFixMe: Delegate the individual reducer defaults to respective reducers.
export default function (state: StoreState = {}, action: FSA): StoreState {
  return {
    counter: counter(state.counter, action),
    currentHand: currentHand(state.currentHand, action),
    routing: routerReducer(state.routing, action),
  };
}

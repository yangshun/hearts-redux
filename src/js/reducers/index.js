// @flow
import type { FSA } from 'types/redux';
import type { CounterState } from 'reducers/counter';

import { routerReducer } from 'react-router-redux';
import counter from 'reducers/counter';

export type StoreState = {
  counter: CounterState,
  routing: Object,
};

// $FlowFixMe: Delegate the individual reducer defaults to respective reducers.
export default function (state: StoreState = {}, action: FSA): StoreState {
  return {
    counter: counter(state.counter, action),
    routing: routerReducer(state.routing, action),
  };
}

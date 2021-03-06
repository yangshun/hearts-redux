import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from 'reducers';

// Creates a preconfigured store for this example.
export default function configureStore(defaultState) {
  const middlewares = [thunk];
  if (process.env.NODE_ENV === 'development') {
    /* eslint-disable */
    const createLogger = require('redux-logger');
    /* eslint-enable */
    const logger = createLogger({
      level: 'info',
      collapsed: true,
      duration: true,
    });
    middlewares.push(logger);
  }
  return createStore(rootReducer, defaultState, applyMiddleware(...middlewares));
}

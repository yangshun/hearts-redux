import _ from 'lodash';
import React from 'react';
import { Router, Route, IndexRoute, useRouterHistory } from 'react-router';
import { createHistory } from 'history'; // eslint-disable-line import/no-extraneous-dependencies
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from 'stores/configure-store';

import AppContainer from 'views/app/AppContainer';
import NotFoundPage from 'views/not-found/NotFoundPage';

import HomePage from 'views/home/HomePage';
import CountersPage from 'views/counters/CountersPage';
import GamePage from 'views/game/GamePage';

const storageStateKey = 'reduxState';
const store = configureStore(JSON.parse(localStorage.getItem(storageStateKey)) || {});
store.subscribe(_.throttle(() => {
  localStorage.setItem(storageStateKey, JSON.stringify(store.getState()));
}, 1000));

const history = syncHistoryWithStore(useRouterHistory(createHistory)({
  basename: '/',
}), store);

export default function () {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={AppContainer}>
          <IndexRoute component={HomePage}/>
          <Route path="/counter" component={CountersPage}/>
          <Route path="/game" component={GamePage}/>
          <Route path="*" component={NotFoundPage}/>
        </Route>
      </Router>
    </Provider>
  );
}

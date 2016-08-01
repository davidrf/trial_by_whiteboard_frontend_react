import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import Root from './components/Root';
import configureStore from './stores/configureStore';
import determineInitialStateFromLocalStorage from './stores/determineInitialStateFromLocalStorage';

let initialState = determineInitialStateFromLocalStorage(localStorage);
const store = configureStore(initialState);
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Root store={store} history={history} />,
  document.getElementById('app')
);

import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import Root from './components/Root';
import { fetchUser } from './reducers/users';
import configureStore from './stores/configureStore';
import TrialByWhiteboardRailsApi from './api/TrialByWhiteboardRailsApi';

let { id, authenticationToken, authenticationTokenExpiresAt } = localStorage;
let initialState;
if (id) {
  let integerId = parseInt(id, 10);
  initialState = {
    users: {
      currentUserId: integerId,
      byId: {
        [integerId]: {
          authenticationToken,
          authenticationTokenExpiresAt
        }
      }
    }
  };
}

const store = configureStore(initialState);
const history = syncHistoryWithStore(browserHistory, store);

if (id) {
  let integerId = parseInt(id, 10);
  store.dispatch(fetchUser(integerId))
}

ReactDOM.render(
  <Root store={store} history={history} />,
  document.getElementById('app')
);

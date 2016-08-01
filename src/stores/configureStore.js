import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux'
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'
import reducers from '../reducers';

let configureStore = preloadedState => {
  let middlewares = [thunkMiddleware, routerMiddleware(browserHistory)];
  let store = createStore(
    reducers,
    preloadedState,
    applyMiddleware(...middlewares)
  );

  return store
};

export default configureStore;

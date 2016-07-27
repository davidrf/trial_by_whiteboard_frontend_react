import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import routes from '../../routes';

let Root = ({ history, store }) => {
  return (
    <Provider store={store}>
      <Router history={history} routes={routes} />
    </Provider>
  );
};

export default Root;

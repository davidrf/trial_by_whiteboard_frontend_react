import React from 'react';
import { IndexRoute, Route } from 'react-router';
import Layout from '../components/Layout';
import HomeContainer from '../containers/HomeContainer';

let routes = (
  <Route path="/" component={Layout}>
    <IndexRoute component={HomeContainer} />
  </Route>
);

export default routes;

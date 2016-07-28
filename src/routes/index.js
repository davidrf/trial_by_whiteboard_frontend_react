import React from 'react';
import { IndexRoute, Route } from 'react-router';
import Layout from '../components/Layout';
import HomeContainer from '../containers/HomeContainer';
import QuestionsContainer from '../containers/QuestionsContainer';

let routes = (
  <Route path="/" component={Layout}>
    <IndexRoute component={HomeContainer} />
    <Route path="questions" component={QuestionsContainer} />
  </Route>
);

export default routes;

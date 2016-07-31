import React from 'react';
import { IndexRoute, Route } from 'react-router';
import Layout from '../components/Layout';
import HomeContainer from '../containers/HomeContainer';
import QuestionsContainer from '../containers/QuestionsContainer';
import QuestionContainer from '../containers/QuestionContainer';

let routes = (
  <Route path="/" component={Layout}>
    <IndexRoute component={HomeContainer} />
    <Route path="questions" component={QuestionsContainer} />
    <Route path="questions/:questionId" component={QuestionContainer} />
  </Route>
);

export default routes;

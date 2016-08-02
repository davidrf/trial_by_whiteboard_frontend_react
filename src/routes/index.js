import React from 'react';
import { IndexRoute, Route } from 'react-router';
import Layout from '../components/Layout';
import HomeContainer from '../containers/HomeContainer';
import QuestionContainer from '../containers/QuestionContainer';
import QuestionFormContainer from '../containers/QuestionFormContainer';
import QuestionsContainer from '../containers/QuestionsContainer';
import LayoutContainer from '../containers/LayoutContainer';

let routes = (
  <Route path="/" component={LayoutContainer}>
    <IndexRoute component={HomeContainer} />
    <Route path="questions" component={QuestionsContainer} />
    <Route path="questions/new" component={QuestionFormContainer} />
    <Route path="questions/:questionId" component={QuestionContainer} />
  </Route>
);

export default routes;

import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form'
import answers from './answers';
import questions from './questions';
import modals from './modals';
import users from './users';

let rootReducer = combineReducers({
  answers,
  form,
  questions,
  modals,
  routing,
  users
});

export default rootReducer;

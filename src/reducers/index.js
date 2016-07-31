import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import answers from './answers';
import questions from './questions';
import users from './users';

let rootReducer = combineReducers({ answers, questions, routing, users });

export default rootReducer;

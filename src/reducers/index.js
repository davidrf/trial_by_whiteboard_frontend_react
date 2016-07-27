import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import questions from './questions';

let rootReducer = combineReducers({ questions, routing });

export default rootReducer;

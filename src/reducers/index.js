import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

let rootReducer = combineReducers({ routing });

export default rootReducer;

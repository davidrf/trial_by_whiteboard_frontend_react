import { combineReducers } from 'redux';
import {
  FETCH_QUESTION_REQUEST_SUCCESS,
  FETCH_QUESTIONS_REQUEST_SUCCESS
} from './questions';

let byId = (state = {}, action) => {
  switch (action.type) {
    case FETCH_QUESTION_REQUEST_SUCCESS:
      let user = { [action.user.id]: action.user };
      return Object.assign({}, state, user);
    case FETCH_QUESTIONS_REQUEST_SUCCESS:
      let users = action.users.reduce((previousValue, currentValue) => {
        previousValue[currentValue.id] = currentValue;
        return previousValue;
      }, {});
      return Object.assign({}, state, users);
    default:
      return state;
  }
};

let users = combineReducers({
  byId
})

export default users;

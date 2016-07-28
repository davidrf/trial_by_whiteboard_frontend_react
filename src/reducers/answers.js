import { combineReducers } from 'redux';
import {
  FETCH_QUESTION_REQUEST_SUCCESS,
  FETCH_QUESTIONS_REQUEST_SUCCESS
} from './questions';

let byId = (state = {}, action) => {
  switch (action.type) {
    case FETCH_QUESTION_REQUEST_SUCCESS:
    case FETCH_QUESTIONS_REQUEST_SUCCESS:
      let answers = action.answers.reduce((previousValue, currentValue) => {
        previousValue[currentValue.id] = currentValue;
        return previousValue;
      }, {});
      return Object.assign({}, state, answers);
    default:
      return state;
  }
};

let answers = combineReducers({
  byId
})

export default answers;

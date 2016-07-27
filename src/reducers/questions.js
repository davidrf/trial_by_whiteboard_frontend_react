import { combineReducers } from 'redux';
import TrialByWhiteboardRailsApi from '../api/TrialByWhiteboardRailsApi';

const FETCH_QUESTIONS_REQUEST = 'FETCH_QUESTIONS_REQUEST';
const FETCH_QUESTIONS_REQUEST_SUCCESS = 'FETCH_QUESTIONS_REQUEST_SUCCESS';
const FETCH_QUESTIONS_REQUEST_FAILURE = 'FETCH_QUESTIONS_REQUEST_FAILURE';

let fetchQuestionRequest = () => ({ type: FETCH_QUESTIONS_REQUEST });
let fetchQuestionRequestSuccess = ({ questions }) => ({
  type: FETCH_QUESTIONS_REQUEST_SUCCESS,
  questions
});
let fetchQuestionRequestFailure = () => ({ type: FETCH_QUESTIONS_REQUEST_FAILURE });
let fetchQuestions = () => dispatch => {
  dispatch(fetchQuestionRequest());
  return TrialByWhiteboardRailsApi.fetchQuestions()
    .then(
      data => { dispatch(fetchQuestionRequestSuccess(data)) },
      () => { dispatch(fetchQuestionRequestFailure) }
    )
};

let byId = (state = {}, action) => {
  switch (action.type) {
    case FETCH_QUESTIONS_REQUEST_SUCCESS:
      let nextState = action.questions.reduce((previousValue, currentValue) => {
        previousValue[currentValue.id] = currentValue;
        return previousValue;
      }, {});
      return Object.assign({}, state, nextState);
    default:
      return state;
  }
};

let indexIds = (state = [], action) => {
  switch (action.type) {
    case FETCH_QUESTIONS_REQUEST_SUCCESS:
      return action.questions.map(question => question.id);
    default:
      return state;
  }
};

let isFetching = (state = false, action) => {
  switch (action.type) {
    case FETCH_QUESTIONS_REQUEST:
      return true
    case FETCH_QUESTIONS_REQUEST_SUCCESS:
    case FETCH_QUESTIONS_REQUEST_FAILURE:
      return false
    default:
      return state;
  }
}

let questions = combineReducers({
  byId,
  indexIds,
  isFetching
})

export {
  questions as default,
  fetchQuestions
};

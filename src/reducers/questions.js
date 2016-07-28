import { combineReducers } from 'redux';
import TrialByWhiteboardRailsApi from '../api/TrialByWhiteboardRailsApi';

const FETCH_QUESTION_REQUEST = 'FETCH_QUESTION_REQUEST';
const FETCH_QUESTION_REQUEST_SUCCESS = 'FETCH_QUESTION_REQUEST_SUCCESS';
const FETCH_QUESTION_REQUEST_FAILURE = 'FETCH_QUESTION_REQUEST_FAILURE';

const FETCH_QUESTIONS_REQUEST = 'FETCH_QUESTIONS_REQUEST';
const FETCH_QUESTIONS_REQUEST_SUCCESS = 'FETCH_QUESTIONS_REQUEST_SUCCESS';
const FETCH_QUESTIONS_REQUEST_FAILURE = 'FETCH_QUESTIONS_REQUEST_FAILURE';

let fetchQuestionRequest = () => ({ type: FETCH_QUESTION_REQUEST });
let fetchQuestionRequestSuccess = ({ answers, question, user }) => ({
  type: FETCH_QUESTION_REQUEST_SUCCESS,
  answers,
  question,
  user
});
let fetchQuestionRequestFailure = () => ({ type: FETCH_QUESTION_REQUEST_FAILURE });
let fetchQuestion = questionId => dispatch => {
  dispatch(fetchQuestionRequest());
  return TrialByWhiteboardRailsApi.fetchQuestion(questionId)
    .then(
      data => { dispatch(fetchQuestionRequestSuccess(data)) },
      () => { dispatch(fetchQuestionRequestFailure) }
    )
};

let fetchQuestionsRequest = () => ({ type: FETCH_QUESTIONS_REQUEST });
let fetchQuestionsRequestSuccess = ({ answers, questions, users }) => ({
  type: FETCH_QUESTIONS_REQUEST_SUCCESS,
  answers,
  questions,
  users
});
let fetchQuestionsRequestFailure = () => ({ type: FETCH_QUESTIONS_REQUEST_FAILURE });
let fetchQuestions = () => dispatch => {
  dispatch(fetchQuestionsRequest());
  return TrialByWhiteboardRailsApi.fetchQuestions()
    .then(
      data => { dispatch(fetchQuestionsRequestSuccess(data)) },
      () => { dispatch(fetchQuestionsRequestFailure) }
    )
};

let byId = (state = {}, action) => {
  switch (action.type) {
    case FETCH_QUESTION_REQUEST_SUCCESS:
      let question = { [action.question.id]: action.question };
      return Object.assign({}, state, question);
    case FETCH_QUESTIONS_REQUEST_SUCCESS:
      let questions = action.questions.reduce((previousValue, currentValue) => {
        previousValue[currentValue.id] = currentValue;
        return previousValue;
      }, {});
      return Object.assign({}, state, questions);
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
    case FETCH_QUESTION_REQUEST:
    case FETCH_QUESTIONS_REQUEST:
      return true
    case FETCH_QUESTION_REQUEST_SUCCESS:
    case FETCH_QUESTION_REQUEST_FAILURE:
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
  fetchQuestion,
  fetchQuestions,
  FETCH_QUESTION_REQUEST_SUCCESS,
  FETCH_QUESTIONS_REQUEST_SUCCESS
};

import { combineReducers } from 'redux';
import {
  CREATE_QUESTION_REQUEST_SUCCESS,
  FETCH_QUESTION_REQUEST_SUCCESS,
  FETCH_QUESTIONS_REQUEST_SUCCESS
} from './questions';
import TrialByWhiteboardRailsApi from '../api/TrialByWhiteboardRailsApi';

const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
const FETCH_USER_REQUEST_SUCCESS = 'FETCH_USER_REQUEST_SUCCESS';
const FETCH_USER_REQUEST_FAILURE = 'FETCH_USER_REQUEST_FAILURE';

const SIGN_IN_USER = 'SIGN_IN_USER';
const SIGN_OUT_USER = 'SIGN_OUT_USER';

let fetchUserRequest = () => ({
  type: FETCH_USER_REQUEST
});
let fetchUserRequestSuccess = ({ user }) => ({
  type: FETCH_USER_REQUEST_SUCCESS,
  user
});
let fetchUserRequestFailure = () => ({
  type: FETCH_USER_REQUEST_FAILURE
});
let fetchUser = id => (dispatch, getState) => {
  let { users: { byId, currentUserId } } = getState();
  let currentUser = byId[currentUserId];
  let authenticationToken = currentUser && currentUser.authenticationToken;
  return TrialByWhiteboardRailsApi.fetchUser(id, authenticationToken)
    .then(
      data => { dispatch(fetchUserRequestSuccess(data)) },
      () => { dispatch(fetchUserRequestFailure()) }
    );
};

let signInUser = ({ user }) => ({
  type: SIGN_IN_USER,
  user
});

let signOutUser = () => ({
  type: SIGN_OUT_USER
});

let currentUserId = (state = null, action) => {
  switch (action.type) {
    case SIGN_OUT_USER:
      return null;
    case SIGN_IN_USER:
      return action.user.id;
    default:
      return state;
  }
};

let byId = (state = {}, action) => {
  switch (action.type) {
    case CREATE_QUESTION_REQUEST_SUCCESS:
    case FETCH_QUESTION_REQUEST_SUCCESS:
    case FETCH_USER_REQUEST_SUCCESS:
    case SIGN_IN_USER:
      let originalUser = state[action.user.id] || {};
      let nextUser = Object.assign({}, originalUser, action.user);
      return Object.assign({}, state, { [action.user.id]: nextUser });
    case FETCH_QUESTIONS_REQUEST_SUCCESS:
      let users = action.users.reduce((previousValue, currentValue) => {
        let originalUser = state[currentValue.id] || {};
        let nextUser = Object.assign({}, originalUser, currentValue);
        previousValue[currentValue.id] = nextUser;
        return previousValue;
      }, {});
      return Object.assign({}, state, users);
    default:
      return state;
  }
};

let isFetching = (state = false, action) => {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return true;
    case FETCH_USER_REQUEST_SUCCESS:
    case FETCH_USER_REQUEST_FAILURE:
      return false;
    default:
      return state;
  }
};

let users = combineReducers({
  byId,
  currentUserId,
  isFetching
})

export {
  users as default,
  fetchUser,
  signInUser,
  signOutUser,
  SIGN_IN_USER
};

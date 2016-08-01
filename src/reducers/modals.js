import { combineReducers } from 'redux';
import { SIGN_IN_USER } from './users';

const OPEN_SIGN_IN_MODAL = 'OPEN_SIGN_IN_MODAL';
const OPEN_SIGN_UP_MODAL = 'OPEN_SIGN_UP_MODAL';
const CLOSE_SIGN_IN_MODAL = 'CLOSE_SIGN_IN_MODAL';
const CLOSE_SIGN_UP_MODAL = 'CLOSE_SIGN_UP_MODAL';

let openSignInModal = () => ({ type: OPEN_SIGN_IN_MODAL });
let openSignUpModal = () => ({ type: OPEN_SIGN_UP_MODAL });
let closeSignInModal = () => ({ type: CLOSE_SIGN_IN_MODAL });
let closeSignUpModal = () => ({ type: CLOSE_SIGN_UP_MODAL });

let signInIsOpen = (state = false, action) => {
  switch (action.type) {
    case OPEN_SIGN_IN_MODAL:
      return true;
    case SIGN_IN_USER:
    case CLOSE_SIGN_IN_MODAL:
      return false;
    default:
      return state;
  }
};

let signUpIsOpen = (state = false, action) => {
  switch (action.type) {
    case OPEN_SIGN_UP_MODAL:
      return true;
    case SIGN_IN_USER:
    case CLOSE_SIGN_UP_MODAL:
      return false;
    default:
      return state;
  }
};

let modals = combineReducers({
  signInIsOpen,
  signUpIsOpen
})

export {
  modals as default,
  closeSignInModal,
  closeSignUpModal,
  openSignInModal,
  openSignUpModal,
  OPEN_SIGN_IN_MODAL,
  OPEN_SIGN_UP_MODAL,
  CLOSE_SIGN_IN_MODAL,
  CLOSE_SIGN_UP_MODAL
};

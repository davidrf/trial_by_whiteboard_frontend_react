import { combineReducers } from 'redux';
import { SIGN_IN_USER } from './users';

const OPEN_SIGN_UP_MODAL = 'OPEN_SIGN_UP_MODAL';
const CLOSE_SIGN_UP_MODAL = 'CLOSE_SIGN_UP_MODAL';

let openSignUpModal = () => ({ type: OPEN_SIGN_UP_MODAL });
let closeSignUpModal = () => ({ type: CLOSE_SIGN_UP_MODAL });

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
  signUpIsOpen
})

export {
  modals as default,
  openSignUpModal,
  closeSignUpModal,
  OPEN_SIGN_UP_MODAL,
  CLOSE_SIGN_UP_MODAL
};

import React from 'react';
import Modal from 'react-modal';
import styles from './styles.css';
import SignUpFormContainer from '../../containers/SignUpFormContainer';
import SignInFormContainer from '../../containers/SignInFormContainer';

const Layout = ({
  children,
  closeSignInModal,
  closeSignUpModal,
  currentUser,
  modalsSignInIsOpen,
  modalsSignUpIsOpen,
  openSignInModal,
  openSignUpModal,
  signOutUser
}) => {
  let authenticationLinks;
  if (currentUser) {
    authenticationLinks = (
      <ul>
        <li>{currentUser.username}</li>
        <li onClick={signOutUser}>Sign Out</li>
      </ul>
    )
  } else {
    authenticationLinks = (
      <ul>
        <li onClick={openSignUpModal}>Sign Up</li>
        <li onClick={openSignInModal}>Sign In</li>
      </ul>
    );
  }

  return (
    <div className={styles.root}>
      {authenticationLinks}
      <Modal
        isOpen={modalsSignUpIsOpen}
        onRequestClose={closeSignUpModal}
      >
        <SignUpFormContainer />
      </Modal>
      <Modal
        isOpen={modalsSignInIsOpen}
        onRequestClose={closeSignInModal}
      >
        <SignInFormContainer />
      </Modal>
      {children}
    </div>
  );
};

export default Layout;

import React from 'react';
import Modal from 'react-modal';
import styles from './styles.css';
import SignUpFormContainer from '../../containers/SignUpFormContainer';

const Layout = ({
  children,
  closeSignUpModal,
  currentUser,
  modalsSignUpIsOpen,
  openSignUpModal,
  signOutUser,
  signUpModalIsOpen
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
      {children}
    </div>
  );
};

export default Layout;

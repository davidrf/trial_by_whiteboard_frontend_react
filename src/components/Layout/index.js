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
  signUpModalIsOpen
}) => {
  let authenticationLinks;
  if (currentUser) {
    authenticationLinks = (
      <li>{currentUser.username}</li>
    )
  } else {
    authenticationLinks = (
      <li onClick={openSignUpModal}>Sign Up</li>
    );
  }

  return (
    <div className={styles.root}>
      <ul>
        {authenticationLinks}
      </ul>
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

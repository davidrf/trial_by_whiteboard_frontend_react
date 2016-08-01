import React, { Component } from 'react';
import { connect } from 'react-redux';
import Layout from '../components/Layout';
import {
  closeSignInModal,
  closeSignUpModal,
  openSignInModal,
  openSignUpModal
} from '../reducers/modals';
import { fetchUser, signOutUser } from '../reducers/users';

class LayoutContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let { currentUserId, fetchUser } = this.props;
    if (currentUserId) {
      fetchUser(currentUserId);
    }
  }

  render() {
    let {
      children,
      closeSignInModal,
      closeSignUpModal,
      currentUserId,
      modalsSignInIsOpen,
      modalsSignUpIsOpen,
      openSignInModal,
      openSignUpModal,
      signOutUser,
      usersById
    } = this.props;

    let currentUser = usersById[currentUserId];

    return (
      <Layout
        closeSignInModal={closeSignInModal}
        closeSignUpModal={closeSignUpModal}
        currentUser={currentUser}
        modalsSignInIsOpen={modalsSignInIsOpen}
        modalsSignUpIsOpen={modalsSignUpIsOpen}
        openSignInModal={openSignInModal}
        openSignUpModal={openSignUpModal}
        signOutUser={signOutUser}
      >
        {children}
      </Layout>
    );
  }
}

let mapStateToProps = ({ users, modals }) => ({
  currentUserId: users.currentUserId,
  modalsSignInIsOpen: modals.signInIsOpen,
  modalsSignUpIsOpen: modals.signUpIsOpen,
  usersById: users.byId
});

let mapDispatchToProps = dispatch => {
  return {
    closeSignInModal() {
      dispatch(closeSignInModal());
    },
    closeSignUpModal() {
      dispatch(closeSignUpModal());
    },
    fetchUser(id) {
      dispatch(fetchUser(id));
    },
    openSignInModal() {
      dispatch(openSignInModal());
    },
    openSignUpModal() {
      dispatch(openSignUpModal());
    },
    signOutUser() {
      dispatch(signOutUser());
      localStorage.removeItem('trialByWhiteboardReact');
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(LayoutContainer);

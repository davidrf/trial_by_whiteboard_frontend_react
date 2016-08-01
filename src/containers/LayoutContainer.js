import React, { Component } from 'react';
import { connect } from 'react-redux';
import Layout from '../components/Layout';
import { closeSignUpModal, openSignUpModal } from '../reducers/modals';
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
      closeSignUpModal,
      currentUserId,
      openSignUpModal,
      modalsSignUpIsOpen,
      signOutUser,
      usersById
    } = this.props;

    let currentUser = usersById[currentUserId];

    return (
      <Layout
        closeSignUpModal={closeSignUpModal}
        currentUser={currentUser}
        modalsSignUpIsOpen={modalsSignUpIsOpen}
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
  modalsSignUpIsOpen: modals.signUpIsOpen,
  usersById: users.byId
});

let mapDispatchToProps = dispatch => {
  return {
    closeSignUpModal() {
      dispatch(closeSignUpModal());
    },
    fetchUser(id) {
      dispatch(fetchUser(id));
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

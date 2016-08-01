import React, { Component } from 'react';
import { connect } from 'react-redux';
import Layout from '../components/Layout';
import { closeSignUpModal, openSignUpModal } from '../reducers/modals';

class LayoutContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {
      children,
      closeSignUpModal,
      currentUserId,
      openSignUpModal,
      modalsSignUpIsOpen,
      usersById
    } = this.props;

    let currentUser = usersById[currentUserId];

    return (
      <Layout
        closeSignUpModal={closeSignUpModal}
        currentUser={currentUser}
        modalsSignUpIsOpen={modalsSignUpIsOpen}
        openSignUpModal={openSignUpModal}
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

export default connect(mapStateToProps, { closeSignUpModal, openSignUpModal })(LayoutContainer);

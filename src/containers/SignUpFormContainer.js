import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { signInUser } from '../reducers/users';
import { closeSignUpModal } from '../reducers/modals';
import SignUpForm from '../components/SignUpForm';
import TrialByWhiteboardRailsApi from '../api/TrialByWhiteboardRailsApi';

let validatePresenceOf = (field, values, errors) => {
  if (!values[field]) {
    let startCasedField = _.startCase(field);
    errors[field] = `${startCasedField} can't be blank`;
  }
};

let fields = ['email', 'username', 'password', 'passwordConfirmation'];

let validate = values => {
  const errors = {};
  fields.forEach(field => {
    validatePresenceOf(field, values, errors);
  });

  let passwordAndPasswordConfirmationPresent = values.password && values.passwordConfirmation;
  let passwordAndPasswordConfirmationDoNotMatch = values.password !== values.passwordConfirmation;
  if (passwordAndPasswordConfirmationPresent && passwordAndPasswordConfirmationDoNotMatch) {
    errors.passwordConfirmation = "confirmation doesn't match";
  }

  return errors;
};

let onSubmitSuccess = (result, dispatch) => {
  let { id, authenticationToken, authenticationTokenExpiresAt } = result.user;
  dispatch(signInUser(result));
  localStorage.id = id;
  localStorage.authenticationToken = authenticationToken;
  localStorage.authenticationTokenExpiresAt = authenticationTokenExpiresAt;
};

export default reduxForm({
  form: 'sign-up',
  validate,
  onSubmit: TrialByWhiteboardRailsApi.createUser,
  onSubmitSuccess
})(SignUpForm);

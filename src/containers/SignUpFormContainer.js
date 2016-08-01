import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import TrialByWhiteboardRailsApi from '../api/TrialByWhiteboardRailsApi';
import SignUpForm from '../components/SignUpForm';
import { closeSignUpModal } from '../reducers/modals';
import { signInUser } from '../reducers/users';
import setLocalStorage from '../utilities/setLocalStorage';

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
  dispatch(signInUser(result));
  setLocalStorage(result.user);
};

export default reduxForm({
  form: 'sign-up',
  validate,
  onSubmit: TrialByWhiteboardRailsApi.createUser,
  onSubmitSuccess
})(SignUpForm);

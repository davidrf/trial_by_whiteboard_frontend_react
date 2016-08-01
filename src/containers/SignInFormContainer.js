import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import TrialByWhiteboardRailsApi from '../api/TrialByWhiteboardRailsApi';
import SignInForm from '../components/SignInForm';
import { signInUser } from '../reducers/users';
import setLocalStorage from '../utilities/setLocalStorage';

let validatePresenceOf = (field, values, errors) => {
  if (!values[field]) {
    let startCasedField = _.startCase(field);
    errors[field] = `${startCasedField} can't be blank`;
  }
};

let fields = ['username', 'password'];

let validate = values => {
  const errors = {};
  fields.forEach(field => {
    validatePresenceOf(field, values, errors);
  });

  return errors;
};

let onSubmitSuccess = (result, dispatch) => {
  dispatch(signInUser(result));
  setLocalStorage(result.user);
};

export default reduxForm({
  form: 'sign-up',
  validate,
  onSubmit: TrialByWhiteboardRailsApi.createAuthenticationToken,
  onSubmitSuccess
})(SignInForm);

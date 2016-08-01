import React from 'react';
import { Field } from 'redux-form';
import FormInputField from '../FormInputField';

const SignUpForm = ({ handleSubmit, submitting }) => {
  return (
    <form onSubmit={handleSubmit}>
      <Field placeholder="Email" name="email" component={FormInputField} type="email" />
      <Field placeholder="Username" name="username" component={FormInputField} type="text" />
      <Field placeholder="Password" name="password" component={FormInputField} type="password" />
      <Field placeholder="Password Confirmation" name="passwordConfirmation" component={FormInputField} type="password" />
      <button name="button" type="submit" disabled={submitting}>Sign Up</button>
    </form>
  );
};

export default SignUpForm;

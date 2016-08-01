import React from 'react';
import { Field } from 'redux-form';
import FormInputField from '../FormInputField';

const SignInForm = ({ handleSubmit, submitting }) => {
  return (
    <form onSubmit={handleSubmit}>
      <Field placeholder="Username" name="username" component={FormInputField} type="text" />
      <Field placeholder="Password" name="password" component={FormInputField} type="password" />
      <button name="button" type="submit" disabled={submitting}>Sign In</button>
    </form>
  );
};

export default SignInForm;

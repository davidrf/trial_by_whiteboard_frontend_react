import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { reduxForm } from 'redux-form';
import QuestionForm from '../components/QuestionForm';
import { createQuestion } from '../reducers/questions';

let validatePresenceOf = (field, values, errors) => {
  if (!values[field]) {
    let startCasedField = _.startCase(field);
    errors[field] = `${startCasedField} can't be blank`;
  }
};

let fields = ['title', 'body'];

let validate = (values, { currentUserId }) => {
  const errors = {};
  fields.forEach(field => {
    validatePresenceOf(field, values, errors);
  });

  return errors;
};

let onSubmit = (values, dispatch) => dispatch(createQuestion(values));
let onSubmitSuccess = ({ question: { id } }, dispatch) => {
  let questionUrl = `/questions/${id}`
  dispatch(push(questionUrl));
};

let QuestionFormContainer = reduxForm({
  form: 'question',
  validate,
  onSubmit,
  onSubmitSuccess
})(QuestionForm);

let mapStateToProps = ({ users }) => ({
  currentUserId: users.currentUserId
});

export default connect(mapStateToProps)(QuestionFormContainer)

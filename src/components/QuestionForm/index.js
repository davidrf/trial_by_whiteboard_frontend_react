import React from 'react';
import { Field } from 'redux-form';
import FormInputField from '../FormInputField';
import FormTextAreaField from '../FormTextAreaField';

const QuestionForm = ({ currentUserId, error, handleSubmit, submitting }) => {
  return (
    <div>
      <h1>Add A Question</h1>
      <form onSubmit={handleSubmit}>
        {!currentUserId && <p>{'Please Sign In To Add A Question'}</p>}
        <Field placeholder="Title" name="title" component={FormInputField} disabled={!currentUserId} type="text" />
        <Field name="body" component={FormTextAreaField} disabled={!currentUserId} type="textarea" />
        <button name="button" type="submit" disabled={!currentUserId || submitting}>Add Question</button>
      </form>
    </div>
  );
};

export default QuestionForm;

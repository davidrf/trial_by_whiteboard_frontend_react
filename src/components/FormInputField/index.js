import React from 'react';

const FormInputField = ({ error, input, touched }) => {
  return (
    <div>
      <div>
        <input {...input} />
        {touched && error && <span>{error}</span>}
      </div>
    </div>
  )
};

export default FormInputField;

import React from 'react';
import Question from '../Question';

const Questions = ({ questions }) => {
  let questionElements = questions.map(question => {
    return <Question key={question.id} {...question} />;
  });

  return (
    <ul>
      {questionElements}
    </ul>
  );
};

export default Questions;

import React from 'react';
import QuestionTile from '../QuestionTile';

const Questions = ({ questions }) => {
  let questionElements = questions.map(question => {
    return <QuestionTile key={question.id} {...question} />;
  });

  return (
    <ul>
      {questionElements}
    </ul>
  );
};

export default Questions;

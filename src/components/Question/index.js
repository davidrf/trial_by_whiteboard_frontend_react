import React from 'react';
import Answer from '../Answer';

const Question = ({ answers, id, title, body, user }) => {
  let answerElements = answers.map(answer => {
    return <Answer key={answer.id} {...answer} />
  });
  return (
    <div>
      <h1>{title}</h1>
      <p>{body}</p>
      <span>{user && user.username}</span>
      <ul>
        {answerElements}
      </ul>
    </div>
  );
};

export default Question;

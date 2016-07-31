import React from 'react';
import { Link } from 'react-router';

const QuestionTile = ({ id, title }) => {
  return <Link to={`questions/${id}`}><li>{title}</li></Link>;
};

export default QuestionTile;

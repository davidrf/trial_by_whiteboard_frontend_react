import React, { Component } from 'react';
import { connect } from 'react-redux';
import Question from '../components/Question';
import Loading from '../components/Loading';
import { fetchQuestion } from '../reducers/questions';

class QuestionContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let { params: { questionId } } = this.props;
    this.props.fetchQuestion(questionId);
  }

  render() {
    const { answersById, questionsById, usersById, params: { questionId } } = this.props;
    let question = questionsById[questionId];
    if (!question) {
      return <Loading />;
    }
    let answers = question.answerIds.map(answerId => answersById[answerId]);
    let user = usersById[question.userId];
    return <Question {...question} answers={answers} user={user} />;
  }
}

let mapStateToProps = ({ answers, questions, users }) => ({
  answersById: answers.byId,
  questionsById: questions.byId,
  usersById: users.byId
});

export default connect(mapStateToProps, { fetchQuestion })(QuestionContainer);

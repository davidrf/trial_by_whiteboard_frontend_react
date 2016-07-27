import React, { Component } from 'react';
import { connect } from 'react-redux';
import Questions from '../components/Questions';
import { fetchQuestions } from '../reducers/questions';

class QuestionsContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchQuestions();
  }

  render() {
    const { questionsById, questionsIndexIds } = this.props;
    let questions = questionsIndexIds.map(questionId => questionsById[questionId])
    return <Questions questions={questions} />;
  }
}

let mapStateToProps = ({ questions }) => {
  return {
    questionsById: questions.byId,
    questionsIndexIds: questions.indexIds
  };
};

export default connect(mapStateToProps, { fetchQuestions })(QuestionsContainer);

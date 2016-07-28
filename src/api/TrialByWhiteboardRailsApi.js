let trialByWhiteboardDomain;
if (process.env.NODE_ENV === 'production') {
  trialByWhiteboardDomain = 'https://davidrf.github.io/';
} else {
  trialByWhiteboardDomain = 'http://localhost:3000';
}

let acceptHeaderV1 = {
  'Accept': 'application/vnd.trialbywhiteboard.herokuapp.com; version=1'
};

let normalizeQuestion = ({ question }) => {
  return {
    answers: question.answers,
    question: {
      body: question.body,
      id: question.id,
      title: question.title,
      link: question.link,
      userId: question.user.id,
      answerIds: question.answers.map(answer => answer.id)
    },
    user: question.user
  };
}

let normalizeQuestions = body => {
  let answers = [];
  let users = [];
  let questions = body.questions.map(question => {
    answers = [...answers, ...question.answers];
    users = [...users, question.user];

    return {
      body: question.body,
      id: question.id,
      title: question.title,
      link: question.link,
      userId: question.user.id,
      answerIds: question.answers.map(answer => answer.id)
    };
  });
  return { answers, questions, users };
}

class TrialByWhiteboardRailsApi {
  static fetchQuestion(questionId) {
    return fetch(`${trialByWhiteboardDomain}/questions/${questionId}`, {
      headers: acceptHeaderV1
    })
    .then(response => {
      let { ok, status, statusText } = response;
      if (ok) {
        return response.json();
      } else {
        let error = new Error(`${status} (${statusText})`);
        throw(error);
      }
    })
    .then(body => normalizeQuestion(body));
  }

  static fetchQuestions() {
    return fetch(`${trialByWhiteboardDomain}/questions`, {
      headers: acceptHeaderV1
    })
    .then(response => {
      let { ok, status, statusText } = response;
      if (ok) {
        return response.json();
      } else {
        let error = new Error(`${status} (${statusText})`);
        throw(error);
      }
    })
    .then(body => normalizeQuestions(body));
  }
}

export default TrialByWhiteboardRailsApi;

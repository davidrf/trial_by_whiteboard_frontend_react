import { SubmissionError } from 'redux-form';

let trialByWhiteBoardApiDomain;
if (process.env.NODE_ENV === 'production') {
  trialByWhiteBoardApiDomain = 'https://trialbywhiteboardrailsapi.herokuapp.com';
} else {
  trialByWhiteBoardApiDomain = 'http://localhost:3000';
}

let acceptHeaderV1 = {
  'Accept': 'application/vnd.trialbywhiteboard.herokuapp.com; version=1'
};

let acceptContentTypeHeadersV1 = Object.assign({}, acceptHeaderV1, {
  'Content-Type': 'application/json'
});

let authorizationHeadersV1 = authenticationToken => {
  return Object.assign({}, acceptHeaderV1, {
    'Authorization': `Token token=${authenticationToken}`
  });
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
  static createUser({ email, password, username}) {
    let body = JSON.stringify({
      user: {
        email,
        password,
        username
      }
    });
    return fetch(`${trialByWhiteBoardApiDomain}/users`, {
      method: 'POST',
      headers: acceptContentTypeHeadersV1,
      body
    })
    .then(response => {
      let { ok, status, statusText } = response;
      if (ok || status === 422) {
        return response.json();
      } else {
        let error = new Error(`${status} (${statusText})`);
        throw(error);
      }
    })
    .then(body => {
      if (body.user) {
        return body;
      } else {
        throw new SubmissionError(body);
      }
    });
  }

  static fetchQuestion(questionId) {
    return fetch(`${trialByWhiteBoardApiDomain}/questions/${questionId}`, {
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
    return fetch(`${trialByWhiteBoardApiDomain}/questions`, {
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

  static fetchUser(id, authenticationToken) {
    let headers;
    if (authenticationToken) {
      headers = authorizationHeadersV1(authenticationToken);
    } else {
      headers = acceptHeaderV1;
    }
    return fetch(`${trialByWhiteBoardApiDomain}/users/${id}`, {
      headers
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
    .then(body => body);
  }

  static createAuthenticationToken({ password, username }) {
    let body = JSON.stringify({
      user: {
        password,
        username
      }
    });
    return fetch(`${trialByWhiteBoardApiDomain}/authentication_tokens`, {
      method: 'POST',
      headers: acceptContentTypeHeadersV1,
      body
    })
    .then(response => {
      let { ok, status, statusText } = response;
      if (ok || status === 422) {
        return response.json();
      } else {
        let error = new Error(`${status} (${statusText})`);
        throw(error);
      }
    })
    .then(body => {
      if (body.user) {
        return body;
      } else {
        throw new SubmissionError(body);
      }
    });
  }
}

export default TrialByWhiteboardRailsApi;

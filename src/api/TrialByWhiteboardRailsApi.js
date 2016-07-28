let trialByWhiteboardDomain;
if (process.env.NODE_ENV === 'production') {
  trialByWhiteboardDomain = 'https://davidrf.github.io/';
} else {
  trialByWhiteboardDomain = 'http://localhost:3000';
}

let acceptHeaderV1 = {
  'Accept': 'application/vnd.trialbywhiteboard.herokuapp.com; version=1'
};

class TrialByWhiteboardRailsApi {
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
    .then(body => {
      return body;
    });
  }
}

export default TrialByWhiteboardRailsApi;

let createResponseFromFixture = fixtureFilename => {
  let fixture = window.__fixtures__[fixtureFilename];
  let responseBody = JSON.stringify(fixture);
  let response = new Response(responseBody, {
    status: 200,
    statusText: 'OK',
    headers: { 'Content-Type': 'application/json' }
  });
  return Promise.resolve(response);
};

export default createResponseFromFixture;

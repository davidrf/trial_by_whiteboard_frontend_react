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

let createResponseWithNoBody = () => {
  let response = new Response(undefined, {
    status: 204,
    statusText: 'No Content'
  });
  return Promise.resolve(response);
};

export {
  createResponseFromFixture,
  createResponseWithNoBody
};

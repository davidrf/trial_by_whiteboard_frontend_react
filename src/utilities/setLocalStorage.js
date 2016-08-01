let setLocalStorage = ({ id, authenticationToken, authenticationTokenExpiresAt }) => {
  localStorage.trialByWhiteboardReact = JSON.stringify({
    id,
    authenticationToken,
    authenticationTokenExpiresAt
  });
};

export default setLocalStorage;

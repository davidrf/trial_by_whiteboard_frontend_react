let determineInitialStateFromLocalStorage = ({ trialByWhiteboardReact }) => {
  if (!trialByWhiteboardReact) {
    return undefined;
  }

  let userInfo = JSON.parse(trialByWhiteboardReact);
  let { authenticationToken, authenticationTokenExpiresAt, id } = userInfo;
  return {
    users: {
      currentUserId: id,
      byId: {
        [id]: {
          authenticationToken,
          authenticationTokenExpiresAt
        }
      }
    }
  };
};

export default determineInitialStateFromLocalStorage;

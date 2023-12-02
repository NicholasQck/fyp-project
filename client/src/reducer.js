const reducer = (state, action) => {
  if (action.type === 'SET_USER') {
    const { decodedUser } = action.payload;
    return {
      ...state,
      user: { ...decodedUser },
    };
  }

  if (action.type === 'LOGOUT_USER') {
    return {
      user: null,
      errorMsg: { show: false, msg: '' },
    };
  }

  return state;
};

export default reducer;

const reducer = (state, action) => {
  if (action.type === 'SET_ERROR') {
    let { show, msg } = state.errorMsg;
    show = action.payload.show;
    msg = action.payload.msg;
    return { ...state, errorMsg: { show, msg } };
  }

  if (action.type === 'SET_USER') {
    const decodedUser = action.payload;
    return { ...state, user: { ...decodedUser } };
  }

  if (action.type === 'LOGOUT_USER') {
    return { ...state, user: null };
  }
};

export default reducer;

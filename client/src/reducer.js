const reducer = (state, action) => {
  if (action.type === 'SET_ERROR') {
    let { show, msg } = state.errorMsg;
    show = action.payload.show;
    msg = action.payload.msg;
    return { ...state, errorMsg: { show, msg } };
  }
};

export default reducer;

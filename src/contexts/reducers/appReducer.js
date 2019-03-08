export const initialState = {
};

const appReducer = (state, action) => {
  switch (action.type) {
  case 'RESET_APP':
    return initialState;
  default:
    return initialState;
  }
};

export default appReducer;

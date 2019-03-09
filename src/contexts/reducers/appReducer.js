import { RESET_APP, CHANGE_TAB, ADD_USER } from '../actions/appActions';

export const initialState = {
  user: null,
};

const appReducer = (state, action) => {
  const { tabIndex, user } = action.payload;
  console.log('reducer')
  switch (action.type) {

    case RESET_APP:
      return initialState;
    case CHANGE_TAB:
      return { ...state, tabIndex }
    case ADD_USER:
      return { ...state, user }

    default:
      return initialState;
  }
};

export default appReducer;

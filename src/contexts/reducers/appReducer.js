import { RESET_APP, CHANGE_TAB } from '../actions/appActions';

export const initialState = {
};

const appReducer = (state, action) => {
  const { tabIndex } = action.payload;
  switch (action.type) {

    case RESET_APP:
      return initialState;
    case CHANGE_TAB:
      return { ...state, tabIndex }

    default:
      return initialState;
  }
};

export default appReducer;

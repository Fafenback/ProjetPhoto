import {
  RESET_LOGIN,
  ADD_CODE,
  ADD_LASTNAME,
  ADD_FIRSTNAME,
  ADD_PSEUDO,
  ADD_LOGIN_ERROR,
} from '../actions/loginActions';

export const initialState = {
  firstname: 'aaaa',
  lastname: 'aaa',
  pseudo: 'aaaa',
  code: '200719',
};

const loginReducer = (state, action) => {
  const {
    lastname, firstname, pseudo, code, error,
  } = action.payload;
  switch (action.type) {
    case RESET_LOGIN:
      return initialState;
    case ADD_CODE:
      return { ...state, code };
    case ADD_LASTNAME:
      return { ...state, lastname };
    case ADD_FIRSTNAME:
      return { ...state, firstname };
    case ADD_PSEUDO:
      return { ...state, pseudo };
    case ADD_LOGIN_ERROR:
      return { ...state, error: error.message };
    default:
      return initialState;
  }
};

export default loginReducer;

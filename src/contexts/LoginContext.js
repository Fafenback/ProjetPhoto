import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import loginReducer, { initialState } from './reducers/loginReducer';

const LoginContext = createContext();

const LoginProvider = (props) => {
  const [state, dispatch] = useReducer(loginReducer, initialState);
  const value = { state, dispatch };
  return <LoginContext.Provider value={value}>{props.children}</LoginContext.Provider>;
};

const LoginConsumer = LoginContext.Consumer;

LoginProvider.propTypes = {
  children: PropTypes.object.isRequired,
};

export { LoginContext, LoginProvider, LoginConsumer };

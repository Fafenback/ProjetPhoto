import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

const AppContext = createContext();

const initialState = {
  name: 'Anthony',
  age: 34,
};

const reducer = (state, action) => {
  const { name } = action.payload;
  switch (action.type) {
  case 'RESET_APP':
    return initialState;
  case 'CHANGE_NAME':
    return { ...state, name };
  default:
    return initialState;
  }
};

const AppProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
};

const AppConsumer = AppContext.Consumer;

AppProvider.propTypes = {
  children: PropTypes.object.isRequired,
};

export { AppContext, AppProvider, AppConsumer };

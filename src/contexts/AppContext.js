import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import appReducer, { initialState } from './reducers/appReducer';

const AppContext = createContext();

const AppProvider = (props) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const value = { state, dispatch };
  return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
};

const AppConsumer = AppContext.Consumer;

AppProvider.propTypes = {
  children: PropTypes.object.isRequired,
};

export { AppContext, AppProvider, AppConsumer };

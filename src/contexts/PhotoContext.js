import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import PhotoReducer, { initialState } from './reducers/photoReducer';

const PhotoContext = createContext();

const PhotoProvider = (props) => {
  const [state, dispatch] = useReducer(PhotoReducer, initialState);
  const value = { state, dispatch };
  return <PhotoContext.Provider value={value}>{props.children}</PhotoContext.Provider>;
};

const PhotoConsumer = PhotoContext.Consumer;

PhotoProvider.propTypes = {
  children: PropTypes.object.isRequired,
};

export { PhotoContext, PhotoProvider, PhotoConsumer };

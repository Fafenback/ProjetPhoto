import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import uploadPhotoReducer, { initialState } from './reducers/uploadPhotoReducer';

const UploadPhotoContext = createContext();

const UploadPhotoProvider = (props) => {
  const [state, dispatch] = useReducer(uploadPhotoReducer, initialState);
  const value = { state, dispatch };
  return <UploadPhotoContext.Provider value={value}>{props.children}</UploadPhotoContext.Provider>;
};

const UploadPhotoConsumer = UploadPhotoContext.Consumer;

UploadPhotoProvider.propTypes = {
  children: PropTypes.object.isRequired,
};

export { UploadPhotoContext, UploadPhotoProvider, UploadPhotoConsumer };

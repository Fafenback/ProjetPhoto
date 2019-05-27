import { ADD_PHOTO } from '../actions/uploadPhotoActions';

export const initialState = {
  photos: null,
};

const uploadPhotoReducer = (state, action) => {
  const { photo } = action.payload;
  switch (action.type) {
  case ADD_PHOTO:
    return { ...state, photo };

  default:
    return initialState;
  }
};

export default uploadPhotoReducer;

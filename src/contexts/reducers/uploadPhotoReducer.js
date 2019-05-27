import { ADD_PHOTO } from '../actions/uploadPhotoActions';

export const initialState = {
  photos: [],
};

const uploadPhotoReducer = (state, action) => {
  const { photo } = action.payload;
  switch (action.type) {
  case ADD_PHOTO:
    return { ...state, photos: [...state.photos, photo] };

  default:
    return initialState;
  }
};

export default uploadPhotoReducer;

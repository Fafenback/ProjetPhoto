import { ADD_PHOTO } from '../actions/photoActions';

export const initialState = {
  photos: [],
};

const PhotoReducer = (state, action) => {
  const { photo } = action.payload;
  switch (action.type) {
  case ADD_PHOTO:
    return { ...state, photos: [...state.photos, photo] };

  default:
    return initialState;
  }
};

export default PhotoReducer;

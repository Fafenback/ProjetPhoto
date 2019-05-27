import React, { useContext, useEffect } from 'react';
import { AppContext } from '../contexts/AppContext';
import { CHANGE_TAB } from '../contexts/actions/appActions';
import PhotoUpload from '../components/PhotoUpload';
import { UploadPhotoProvider } from '../contexts/UploadPhotoContext';
import Photo from '../components/Photo';

const News = (props) => {
  const { dispatch } = useContext(AppContext);
  useEffect(() => {
    dispatch({ type: CHANGE_TAB, payload: { tabIndex: 1 } });
  }, []);

  return (
    <div>
      {[1, 2, 3, 4].map((elt) => (
        <Photo src="https://react.semantic-ui.com/images/wireframe/image.png" />
      ))}
      {/* <UploadPhotoProvider>
        <PhotoUpload />
      </UploadPhotoProvider> */}
    </div>
  );
};

News.propTypes = {};

export default News;

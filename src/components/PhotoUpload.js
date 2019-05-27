import * as React from 'react';
import { Icon } from 'semantic-ui-react';
import styled from 'styled-components';
import { UploadPhotoContext } from '../contexts/UploadPhotoContext';
import { ADD_PHOTO } from '../contexts/actions/uploadPhotoActions';

export default (props) => {
  const { state, dispatch } = React.useContext(UploadPhotoContext);
  const onChange = (e) => dispatch({ type: ADD_PHOTO, payload: { photo: e.target.files[0] } });
  const showPhotoBeforeUpload = function (event) {
    const output = document.getElementById('output');
    output.src = URL.createObjectURL(event.target.files[0]);
  };
  return (
    <React.Fragment>
      {state.photos.map((photo, i) => (
        <div key={i} className="miniature" />
      ))}
      {state.photos.length && state.photos.length < 3 && (
        <label htmlFor="file-input">
          <div className="miniature">
            <Icon name="plus" size="huge" />
          </div>
          <input style={{ display: 'none' }} id="file-input" onChange={onChange} multiple type="file" accept="image/*" />
        </label>
      )}
      <label className={'uploadButton'} htmlFor="file-input">
        {!state.photos.length ? <Icon name="plus circle" size="huge" /> : null}
        <input style={{ display: 'none' }} id="file-input" onChange={onChange} multiple type="file" accept="image/*" />
      </label>
      {state.photos.length ? <Icon name="check circle" onChange={console.log('upload')} size="huge" /> : null}
    </React.Fragment>
  );
};

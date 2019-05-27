import * as React from 'react';
import { Icon } from 'semantic-ui-react';
import styled from 'styled-components';
import axios from 'axios';
import io from 'socket.io-client';
import { UploadPhotoContext } from '../contexts/UploadPhotoContext';
import { ADD_PHOTO } from '../contexts/actions/uploadPhotoActions';
import { AppContext } from '../contexts/AppContext';

const socket = io.connect('http://localhost');
export default (props) => {
  const [loaded, increaseLoader] = React.useState(0);
  const { state, dispatch } = React.useContext(UploadPhotoContext);
  const {
    state: { user },
  } = React.useContext(AppContext);
  const onChange = (e) => dispatch({ type: ADD_PHOTO, payload: { photo: e.target.files[0] } });
  React.useEffect(() => {
    console.log(loaded);
  }, [loaded]);
  const handleUpload = (e) => {
    e.preventDefault();
    const data = new FormData();

    data.append('photos', state.photo, state.photo.name);

    axios
      .post('http://localhost:3000/upload', data, {
        headers: {
          'content-type': 'multipart/form-data',
        },
        onUploadProgress: (ProgressEvent) => {
          increaseLoader((ProgressEvent.loaded / ProgressEvent.total) * 100);
        },
      })
      .then((res) => {
        axios({
          method: 'post',
          url: '/pictures/create',
          data: {
            title: 'bite',
            comment: 'ta race',
            downloadLink: res.data.original.Location,
            link: res.data.lg.Location,
            pseudo: user.user.pseudo,
            fullName: 'teub',
            userId: user.user.userId,
          },
        }).then((res) => {
          socket.on('news', (response) => {
            console.log(response);
            socket.emit('uploaded', { my: response });
          });
        });
      });
  };
  return (
    <React.Fragment>
      {state.photo && <div className="miniature" />}
      <label className={'uploadButton'} htmlFor="file-input">
        {!state.photo ? <Icon name="plus circle" size="huge" /> : null}
        <input style={{ display: 'none' }} id="file-input" onChange={onChange} type="file" accept="image/*" />
      </label>
      {state.photo ? <Icon name="check circle" onClick={handleUpload} size="huge" /> : null}
    </React.Fragment>
  );
};

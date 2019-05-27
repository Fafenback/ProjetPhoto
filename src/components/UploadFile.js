import React, { Component } from 'react';
import axios from 'axios';

export default class UploadFile extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedFile: null, loaded: 0 };

    this.handleUpload = this.handleUpload.bind(this);
    this.handleselectedFile = this.handleselectedFile.bind(this);
  }

  handleUpload(e) {
    e.preventDefault();
    const data = new FormData();
    Object.keys(this.state.selectedFile).forEach((file) => {
      data.append('photos', this.state.selectedFile[file], this.state.selectedFile[file].name);
    });
    axios
      .post('http://localhost:3000/upload', data, {
        headers: {
          'content-type': 'multipart/form-data',
        },
        onUploadProgress: (ProgressEvent) => {
          this.setState({
            loaded: (ProgressEvent.loaded / ProgressEvent.total * 100),
          });
        },
      })
      .then((res) => {
        console.log(res);
      });
  }

  handleselectedFile(event) {
    this.setState({
      selectedFile: event.target.files,
      loaded: 0,
    });
  }

  render() {
    return (
      <div>
        <input type="file" name="" id="" onChange={this.handleselectedFile} multiple />
        <button onClick={this.handleUpload}>Upload</button>
        <div> {Math.round(this.state.loaded, 2) } %</div>
      </div>
    );
  }
}

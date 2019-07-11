import React, { Component } from 'react';
import 'cropperjs/dist/cropper.css';

import Cropper from '../../src/react-cropper';


const src = 'img/child.jpg';

export default class Demo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      src,
      cropResult: null,
    };
    this.cropImage = this.cropImage.bind(this);
    this.onChange = this.onChange.bind(this);
    this.useDefaultImage = this.useDefaultImage.bind(this);
  }

  onChange(e) {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      this.setState({ src: reader.result });
    };
    reader.readAsDataURL(files[0]);
  }

  cropImage() {
    if (typeof this.cropper.getCroppedCanvas() === 'undefined') {
      return;
    }
    //console.log(this.cropper.getCroppedCanvas().toDataURL());
    this.setState({
      cropResult: this.cropper.getCroppedCanvas().toDataURL(),
    });
  }

  useDefaultImage() {
    this.setState({ src });
  }

  render() {
    return (
      <div>
        <div style={{ width: '100%' }}>
          <input type="file" onChange={this.onChange} />
          <button onClick={this.useDefaultImage}>Use default img</button>
          <br />
          <Cropper
            className='hahha'
            style={{ height: 279, width: 400 }}
            aspectRatio={16 / 8}
            preview=".img-preview"
            guides={false}
            src={this.state.src}
            ref={cropper => { this.cropper = cropper; }}
          />
        </div>
        <br/> <br/> <br/> <br/> <br/> <br/>
        <div>
          <div className="box">
            <h1>Preview</h1>
            <div className="img-preview"/>
          </div>
          <br/> <br/> <br/> <br/> <br/> <br/>
          <div className="box">
            <h1>
              <span>Crop</span>
              <button onClick={this.cropImage}> Crop Image </button>
            </h1>
            <img src={this.state.cropResult} alt="cropped image" />
          </div>
        </div>
        <br style={{ clear: 'both' }} />
      </div>
    );
  }
}

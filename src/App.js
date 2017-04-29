import React, { Component } from 'react';
import { Image, CloudinaryContext, Transformation } from 'cloudinary-react';
import { SketchPicker } from 'react-color';

import './App.css';

const ImageTransformations = ({ width, rgb, selectedShirt, text }) => {
  if (text.length > 0) {
    return (
      <Image publicId={selectedShirt.main+'.jpg'}>
        <Transformation width={width} crop="scale" />
        <Transformation effect={'red:'+((-1+rgb.r/255)*100).toFixed(0)} />
        <Transformation effect={'blue:'+((-1+rgb.b/255)*100).toFixed(0)} />
        <Transformation effect={'green:'+((-1+rgb.g/255)*100).toFixed(0)} />
        <Transformation overlay={'text:Roboto_30:'+ text} flags="relative" gravity="center" />
      </Image>
    );
  }
  else {
    return (
      <Image publicId={selectedShirt.main+'.jpg'}>
        <Transformation width={width} crop="scale" />
        <Transformation effect={'red:'+((-1+rgb.r/255)*100).toFixed(0)} />
        <Transformation effect={'blue:'+((-1+rgb.b/255)*100).toFixed(0)} />
        <Transformation effect={'green:'+((-1+rgb.g/255)*100).toFixed(0)} />
      </Image>
    );
  }

}


class App extends Component {
  constructor(props) {
    super(props);
    const defaultShirt = { id: 1, main: 'shirt_only', underlay: 'model2', overlay: '' };

    this.state = {
      text: '',
      shirts: [
        defaultShirt,
        { id: 2, main: 'laying_shirt', underlay: '', overlay: '' },
        { id: 3, main: 'hanging_t_shirt', underlay: '', overlay: 'hanger' }
      ],
      selectedShirt: defaultShirt,
      background: {rgb:{r:255,g:255,b:255}}
    };

    this.handleColorChange = this.handleColorChange.bind(this);
    this.selectShirt = this.selectShirt.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
  }

  handleColorChange(color) {
    this.setState({ background: color }, _ => this.forceUpdate());
  }

  handleTextChange(event) {
    this.setState({text: event.target.value});
  }

  selectShirt(thumb) {
    this.setState({ selectedShirt: thumb});
  }

  render() {
    const rgb = this.state.background.rgb;
    const cloudName = process.env.REACT_APP_CLOUD_NAME;
    return (
      <div className="App">
        <CloudinaryContext cloudName={cloudName}>
          <div id="demoContainer">
            <div id="header">
              <a href="http://cloudinary.com">
                <img width="172" height="38" src="http://res-1.cloudinary.com/cloudinary/image/asset/dpr_2.0/logo-e0df892053afd966cc0bfe047ba93ca4.png" alt="Cloudinary Logo" />
              </a>
              <h1>Product Personalization Demo</h1>
            </div>
          </div>
          <div id="imageDemoContainer">
            <div id="mainImage">
              <ImageTransformations
                        width="600"
                        rgb={rgb}
                        selectedShirt={this.state.selectedShirt}
                        text={this.state.text} />
            </div>
            <div id="imageThumbs">
              <ul id="thumbs">
                {this.state.shirts.map(thumb => {
                  return (
                    <li className={thumb.main === this.state.selectedShirt.main ? 'active' : ''}
                        onClick={() => this.selectShirt(thumb)}
                        key={thumb.id}>
                      <ImageTransformations
                                width="75"
                                rgb={rgb}
                                selectedShirt={thumb}
                                text={' '} />
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
          <div id="demoInputContainer">
            <div className="inputSelections">
              <h2>Shirt Color:</h2>
              <SketchPicker
                    color={this.state.background.hex}
                    onChange={this.handleColorChange}/>
              <h2>Text:</h2>
              <input className="form-control"
                     type="text"
                     placeholder="Enter Text"
                     value={this.state.text}
                     onChange={this.handleTextChange} />
            </div>
          </div>
        </CloudinaryContext>
      </div>
    );
  }
}

export default App;

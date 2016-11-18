import 'aframe';
import 'aframe-animation-component';
import 'aframe-text-component';
import 'babel-polyfill';
import {Entity, Scene} from 'aframe-react';
import React from 'react';
import ReactDOM from 'react-dom';

import categories from './categories';
console.log(categories)

import Camera from './components/Camera';
import Text from './components/Text';
import Sky from './components/Sky';
import CurvedImage from './components/CurvedImage';

class VRScene extends React.Component {
  constructor(props) {
    super(props);
    this.changeBanner = this.changeBanner.bind(this);
    this.state = {categoryImage: categories[0].image};
  }

  changeBanner(id, image) {
    console.log('hello', image)
    this.setState({
      categoryImage: image,
      categoryId: id,
    });
  }


    // obj.setAttribute('src', `assets/${id}.png`);
    // obj.setAttribute('radius', '15');
    // obj.setAttribute('theta-length', length);
    // obj.setAttribute('rotation', `0 ${width * index} 0`);
    // obj.setAttribute('height', `6`);
    // obj.setAttribute('opacity', '.75');
    // obj.setAttribute('crossorigin', 'anonymous'); // doesn't work :/
    // // obj.setAttribute('cursor', 'fuse: true;');
    // obj.addEventListener('click', e => { showSubcategories(id) });
    // categoriesContainer.appendChild(obj);

  render () {
    return (
      <Scene>
        <Camera>
          <a-cursor
            animation__click="property: scale; startEvents: click; from: 0.1 0.1 0.1; to: 1 1 1; dur: 150"
>
          </a-cursor>
        </Camera>

        <Sky src="url(https://rawgit.com/aframevr/assets/gh-pages/360-image-gallery-boilerplate/img/sechelt.jpg)"/>

        <Entity light={{type: 'ambient', color: '#888'}}/>
        <Entity light={{type: 'directional', intensity: 0.5}} position='-1 1 0'/>
        <Entity light={{type: 'directional', intensity: 1}} position='1 1 0'/>

          <CurvedImage
            geometry={{radius: 20, height: 20, thetaLength: 360}}
            material={{src: `url(${this.state.categoryImage})`}} />

        {categories.map((category, index) =>
          <CurvedImage
            geometry={{radius: 15, height: 6, thetaLength: (360 / categories.length) - 3}}
            rotation={`0 ${360 / categories.length * index} 0`}
            material={{src: `url(assets/${category.id}.png)`, opacity: this.state.categoryId === category.id ? 1 : 0.75}}
            onClick={() => this.changeBanner(category.id, category.image)} />
        )}

      </Scene>
    );
  }
}

ReactDOM.render(<VRScene/>, document.querySelector('.scene-container'));

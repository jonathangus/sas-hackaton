import React from 'react';
import styled from 'styled-components';
import { primaryColor } from '../vars';
import mapInstance from '../mapInstance';
import once from 'lodash/once';
import emitter from '../uiEmitter';

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  position: fixed;
`;
const accessToken =
  'pk.eyJ1Ijoiam9udGlzIiwiYSI6ImNqZnlhdW81MjE3azgyemtkejgwYm96Y2UifQ.9EbA8Z8QJGw2M8SBnLBSGg';

class Map extends React.Component {
  container = React.createRef();

  componentDidMount() {
    const mapboxgl = require('mapbox-gl');
    mapboxgl.accessToken = accessToken;

    this.map = new mapboxgl.Map({
      container: this.container.current,
      style: 'mapbox://styles/jontis/cjfyb4vzm6hm02rob93cz4g4o',
      zoom: 2,
      center: [50.10229, 14.424629],
      pitch: 30,
      maxZoom: 10,
      dragRotate: false
    });

    this.map.on('load', () => mapInstance.setMap(this.map, mapboxgl));
    this.map.on('drag', this.removeTitle);
    this.map.on('click', this.removeTitle);
    this.map.on('wheel', this.removeTitle);
  }

  removeTitle = once(() => {
    emitter.emit('mapTouched');
  });

  render() {
    return <Wrapper innerRef={this.container} />;
  }
}

export default Map;

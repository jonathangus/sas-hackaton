import UiStore from './stores/UiStore';
import { featureCollection, point } from '@turf/helpers';
import throttle from 'lodash/throttle';
import get from 'lodash/get';
import once from 'lodash/once';
import SelectedDestination from './components/SelectedDestination';
import ReactDOM from 'react-dom';
import React from 'react';

class MapInstance {
  selectedContainer;

  setMap(map, mapboxgl) {
    this.map = map;
    this.mapboxgl = mapboxgl;
    UiStore.setLoaded();

    this.map.on(
      'wheel',
      throttle(() => {
        UiStore.setSelectedDestination(null);
        this.removeCurrentMarker();
      }, 400)
    );

    this.markerContainer = document.createElement('div');
    this.markerContainer.className = 'selected-marker';
    this.marker = new mapboxgl.Marker(this.markerContainer, {
      // offset: [-120, 0]
    })
      .setLngLat([0, 0])
      .addTo(this.map);
  }

  removeCurrentMarker() {
    const currentElem = document.querySelector('#selected');

    if (currentElem) {
      ReactDOM.unmountComponentAtNode(this.markerContainer);
    }
  }

  setDestination = destination => {
    if (!destination) {
      return this.removeCurrentMarker();
    }
    const coordinates = [
      destination.coordinates.longitude,
      destination.coordinates.latitude
    ];

    this.flyTo(coordinates);

    const currentElem = document.querySelector('#selected');
    this.currentMarker = currentElem;

    const add = () => {
      ReactDOM.render(
        React.createElement(SelectedDestination, {
          destination
        }),
        this.markerContainer
      );
      currentElem && currentElem.classList.add('fadeIn');
      this.marker.setLngLat(coordinates);
      this.flyTo(coordinates);
    };

    if (currentElem) {
      currentElem.classList.add('fadeOut');
      currentElem.classList.remove('fadeIn');
      document.getElementById('selected-img').src = '';

      setTimeout(() => {
        currentElem.classList.remove('fadeOut');

        add();
      }, 350);
    } else {
      add();
    }
  };

  currentMarker;

  addClickers = once(() => {
    this.map.on('click', e => {
      const features = this.map.queryRenderedFeatures(e.point, {
        layers: ['labels']
      });
      if (!features.length) {
        return;
      }

      const airportCode = get(features[0], 'properties.airportCode');
      const result = UiStore.destinations.find(
        des => get(des, 'location.airportCode') == airportCode
      );
      UiStore.setSelectedDestination(result);
    });

    this.map.on('mousemove', e => {
      const features = this.map.queryRenderedFeatures(e.point, {
        layers: ['labels']
      });
      if (!features.length) {
        return;
      }

      this.map.getCanvas().style.cursor = features.length ? 'pointer' : '';
    });
  });

  flyTo = coordinates => {
    this.map.flyTo({ center: coordinates, zoom: 5 });
  };

  fitBounds = origins => {
    const bounds = new this.mapboxgl.LngLatBounds();

    origins.forEach(origin => {
      bounds.extend([
        origin.coordinates.longitude,
        origin.coordinates.latitude
      ]);
    });

    this.map.fitBounds(bounds);
  };

  showLocations = origins => {
    const points = origins.map(origin =>
      point([origin.coordinates.longitude, origin.coordinates.latitude], {
        city: origin.city,
        price: origin.price,
        currency: origin.currency,
        bonusProgress: '✅', //origin.bonusProgress,
        airportCode: origin.location.airportCode
      })
    );

    const srcId = 'circles';
    const layerId = 'labels';
    const bonusId = 'bonus';

    if (this.map.getLayer(layerId)) this.map.removeLayer(layerId);
    if (this.map.getLayer(bonusId)) this.map.removeLayer(bonusId);
    if (this.map.getSource(srcId)) this.map.removeSource(srcId);

    this.src = this.map.addSource(srcId, {
      type: 'geojson',
      data: featureCollection(points)
    });

    this.map.addLayer({
      id: layerId,
      type: 'symbol',
      source: srcId,
      layout: {
        'text-field': '{price}'
      },
      paint: {
        'text-color': 'white'
      }
    });

    if (!this.src) {
      this.fitBounds(origins);
    }
    this.addClickers();
  };
}

export default new MapInstance();

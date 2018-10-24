import { observable, action, runInAction } from 'mobx';
import months from '../constants/months';
import emitter from '../uiEmitter';
import mapInstance from '../mapInstance';
import get from 'lodash/get';
import moment from 'moment';
import regions from '../constants/regions';
import destinations from '../../tmp/destinations.json';

moment.locale('sv');

const points = {};

const mapDestinations = destinations => {
  return destinations.map(destination => {
    const { flightProducts = [] } = destination;

    const prices = {};
    const bonuses = {};
    let requiredPoints;

    flightProducts.forEach(month => {
      const m = moment(month.outBoundDate).format('MMM');
      const price = get(month, 'lowestPrice.totalPrice');
      const a = 60000 / 10000;
      const requiredBonus = a * price;

      if (price && !prices[m]) {
        prices[m] = parseInt(price);
        bonuses[m] = requiredBonus;
        requiredPoints =
          requiredBonus && Math.round(requiredBonus / 1000) * 1000;
      }
    });

    return {
      ...destination,
      city: get(destination, 'location.cityName'),
      prices,
      bonuses,
      requiredPoints
    };
  });
};
let origins = mapDestinations(destinations.filter(d => d.coordinates));

class UiStore {
  @observable
  isPageLoading = true;
  @observable
  selectedDestination = null;
  @observable
  destinations = origins;
  @observable
  selectedMonth = months[0];

  @observable
  priceFilter = 13449;

  @observable
  showFlights = false;

  user = {
    points: 9130
  };

  @action
  setSelectedMonth = month => {
    this.selectedMonth = month;
    this.setSelectedDestination(null);
    mapInstance.removeCurrentMarker();

    this.updateLocations();
  };

  fetchDestinations() {}

  @action
  setLoaded = () => {
    this.isPageLoading = false;

    setTimeout(() => {
      emitter.emit('pageLoaded');
      this.updateLocations();

      const coords = this.destinations
        .filter(d =>
          regions[0].airports.includes(get(d, 'destinationAirport.code'))
        )
        .filter(d => d.coordinates);
      // .map(d => [d.coordinates.latitude, d.coordinates.latitude]);

      mapInstance.fitBounds(coords);
      // TODO
    }, 200);
  };

  updateLocations = () => {
    const final = origins
      .map(origin => {
        const price = origin.prices[this.selectedMonth];
        const bonus = origin.bonuses[this.selectedMonth];

        let bonusProgress = (this.user.points / bonus) * 100;

        if (price) {
          bonusProgress = bonusProgress > 100 ? 100 : parseInt(bonusProgress);
        }

        return {
          ...origin,
          priceRaw: price,
          price: price && `${price} ${origin.currency}`,
          bonusProgress,
          euroBonus: bonus
        };
      })
      .filter(dest => dest.priceRaw && dest.priceRaw < this.priceFilter);

    mapInstance.showLocations(final);
  };

  @action
  setSelectedDestination(destination) {
    this.selectedDestination = null;

    setTimeout(() => {
      this.selectedDestination = destination;
      mapInstance.setDestination(destination);
    }, 50);
  }

  @action
  randomDestination = () => {
    const destination = origins[Math.floor(Math.random() * origins.length)];
    this.setSelectedDestination(destination);
  };

  @action
  toggleModdal = () => {
    this.showFlights = !this.showFlights;
  };

  @action
  clearSelected = () => {
    this.setSelectedDestination(null);
    mapInstance.removeCurrentMarker();
  };

  @action
  setPriceFilter = value => {
    this.clearSelected();
    this.priceFilter = value;
    this.updateLocations();
  };

  @action
  focusRegion = regions => {
    this.setSelectedDestination(null);
    mapInstance.removeCurrentMarker();

    const coords = this.destinations
      .filter(d => regions.includes(get(d, 'destinationAirport.code')))
      .filter(d => d.coordinates);
    // .map(d => [d.coordinates.latitude, d.coordinates.latitude]);

    mapInstance.fitBounds(coords);
  };
}

export default new UiStore();

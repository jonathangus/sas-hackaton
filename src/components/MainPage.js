import React from 'react';
import styled from 'styled-components';
import Map from './Map';
import DatePicker from './MonthPicker';
import Intro from './Intro';
import { observer } from 'mobx-react';
import UiStore from '../stores/UiStore';
import Loader from './Loader';
import { bgColor } from '../vars';
import MapInfo from './MapInfo';
import RandomDestination from './RandomDestination';
import TravelInfo from './TravelInfo';
import Filters from './Filters';
import User from './User';

const Container = styled.div`
  height: 100vh;
  position: relative;
`;

const PageLoader = styled.div`
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: ${bgColor};
  opacity: ${props => (props.active ? 1 : 0)};
  transition: opacity 0.4s ease;
  pointer-events: none;
`;

@observer
class MainPage extends React.Component {
  componentDidMount() {
    UiStore.fetchDestinations();
  }

  render() {
    return (
      <Container>
        <Intro />
        <Map />
        <DatePicker />
        <PageLoader active={UiStore.isPageLoading}>
          <Loader />
        </PageLoader>
        <RandomDestination />

        {UiStore.showFlights && <TravelInfo />}
        <Filters />
        <User />

        <div id="selected-root" />
      </Container>
    );
  }
}

export default MainPage;

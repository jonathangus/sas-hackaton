import React from 'react';
import styled, { keyframes, injectGlobal } from 'styled-components';
import { middle, darkest, light } from '../vars';
import months from '../constants/months';
import UiStore from '../stores/UiStore';
import { observer } from 'mobx-react';
import anime from 'animejs';
import { findDOMNode, createPortal } from 'react-dom';
import mapInstance from '../mapInstance';
import get from 'lodash/get';
import Calendar from './Calendar';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.85);
  }

  to {
    opacity: 1;
    transform: scale(1)
  }
`;

injectGlobal`
.selected-marker {
  display:inline-block;
  // width: 340px;


}

  .fadeIn {
    animation: ${fadeIn} 0.4s ease forwards;
  }

  #selected {
    transition: opacity 0.3s ease;
  }
  .fadeOut {
     opacity: 0 !important;
  }
`;

const Cross = styled.div`
  cursor: pointer;
  position: absolute;
  color: white;
  z-index: 4;

  right: 10px;
  top: 10px;
  line-height: 1;
  font-size: 27px;
`;
//   animation: ${fadeIn} 0.4s ease forwards;
const Wrapper = styled.div`
  display: inline-block;
  position: relative;
  z-index: 500;
  background: #fff;
  border-radius: 4px;
  color: #333;
  width: 340px;
  overflow: hidden;

  @media (max-width: 730px) {
    margin-right: 51px;
    margin-top: -57px;
    width: 250px;
  }

  img {
    max-width: 100%;
  }

  h3 {
    display: flex;
    align-items: center;
  }
`;

const Inner = styled.div`
  padding: 10px;
`;

const Stats = styled.div`
  font-size: 14px;
  margin-top: 5px;
  color: #3c3c3c;
`;

const Flights = styled.div`
  color: ${light};
  cursor: pointer;
  font-size: 14px;
  margin-top: 10px;
`;

const ImageWrap = styled.div`
  height: 175px;
  overflow: hidden;

  @media (max-width: 730px) {
    height: 125px;
  }
`;
const Airport = styled.span`
  color: #8b8b8b;
  font-size: 13px;
  margin-left: 5px;
`;

const Step = styled.div`
  font-size: 13px;

  span {
    margin-right: 5px;
  }
`;
const Bonus = styled.span`
  font-weight: bold;
  font-family: 'ScandinavianNew', 'Helvetica', sans-serif;

  color: ${light};
`;

const Slider = styled.div`
  display: flex;
  width: 200%;
  transition: transform 0.25s ease-in-out;
  transform: ${props => (props.active ? 'translateX(-50%)' : 'translateX(0)')};
`;

const SlidePart = styled.div`
  flex: 1;
  width: 100%;
`;

const Select = styled.div`
  display: flex;
  margin-top: 10px;
  border-top: 1px solid ${darkest};
  margin-bottom: -1px;
`;

const SelectItem = styled.div`
  flex: 1;
  text-align: center;
  padding: 10px;
  cusor: pointer;
  background-color: ${props => (props.active ? middle : 'white')};
  color: ${props => (props.active ? 'white' : middle)};
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    color: white;
    background-color: ${middle};
  }
`;

class SelectedDestination extends React.Component {
  state = {
    calenderView: false
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      get(prevProps, 'destination.city') !== get(this.props, 'destination.city')
    ) {
      this.setState({ calenderView: false });
    }
  }

  firstView() {
    const { destination } = this.props;
    const { formattedAddress, country, requiredPoints } = destination;

    return (
      <SlidePart>
        <ImageWrap>
          <img
            id="selected-img"
            src={`https://source.unsplash.com/340x175/?${get(
              destination,
              'location.country'
            )}`}
          />
        </ImageWrap>
        <Inner>
          <h3>
            {get(destination, 'location.cityName')} -{' '}
            {get(destination, 'location.country')}
            <Airport>{get(destination, 'location.airportCode')}</Airport>
          </h3>
          <Step>
            <span>{get(destination, 'flightInformation.flight_time')}</span>
            <span>
              {get(destination, 'flightInformation.flight_distance')} km
            </span>
          </Step>
          <Step>
            Krävda EuroBonus poäng:{' '}
            <Bonus>
              {UiStore.user.points} / {requiredPoints}{' '}
              {UiStore.user.points > requiredPoints && '✅'}
            </Bonus>
          </Step>
          <Step>
            Platser kvar: <Bonus>23</Bonus>
          </Step>
          <Stats>
            <div>🎵 Kendrick Lamar - 25 okt</div>
            <div>🎵 Magnus Uggla - 25 nov</div>
            <div>🍽 3 Michelin star</div>
            <div>☀️ Average 26°</div>
          </Stats>
        </Inner>
      </SlidePart>
    );
  }

  secondView() {
    return <SlidePart>boka</SlidePart>;
  }

  render() {
    const { destination } = this.props;

    return (
      <Wrapper id="selected">
        <Cross onClick={UiStore.clearSelected}>x</Cross>
        <Slider active={this.state.calenderView}>
          {this.firstView()}
          <Calendar />
        </Slider>
        <Select>
          <SelectItem
            onClick={() => this.setState({ calenderView: false })}
            active={!this.state.calenderView}
          >
            Info
          </SelectItem>
          <SelectItem
            onClick={() => this.setState({ calenderView: true })}
            active={this.state.calenderView}
          >
            Boka
          </SelectItem>
        </Select>
      </Wrapper>
    );
  }
}

export default SelectedDestination;

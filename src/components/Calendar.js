import React from 'react';
import styled from 'styled-components';
import UiStore from '../stores/UiStore';
import { observer } from 'mobx-react';
import PriceSlider from './PriceSlider';
import emitter from '../uiEmitter';
import anime from 'animejs';
import { findDOMNode } from 'react-dom';
import RegionSelect from './RegionSelect';
import imgSrc from '../images/book.png';
import img1 from '../images/step1.png';
import img2 from '../images/step2.png';

const Container = styled.div`
  width: 100%;
  flex: 1;
`;

const Part = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;

  span {
    flex: 1;
    display: block;
    font-size: 14px;
    margin-right: 5px;
  }
  img {
    width: 70%;
  }
`;

@observer
class Calendar extends React.Component {
  render() {
    const { destination } = this.props;

    return (
      <Container>
        <img src={imgSrc} />
        <Part>
          <span>06:30 - 18:30</span>
          <img src={img1} />
        </Part>
        <Part>
          <span>09:50 - 18:30</span>
          <img src={img2} />
        </Part>
      </Container>
    );
  }
}

export default Calendar;

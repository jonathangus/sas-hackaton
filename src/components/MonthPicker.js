import React from 'react';
import styled from 'styled-components';
import { middle, darkest, light } from '../vars';
import months from '../constants/months';
import UiStore from '../stores/UiStore';
import { observer } from 'mobx-react';
import emitter from '../uiEmitter';
import anime from 'animejs';
import { findDOMNode } from 'react-dom';
import throttle from 'lodash/throttle';

const Container = styled.div`
  position: fixed;
  z-index: 20;
  right: 0px;
  top: 50%;
  transform: translateY(-50%);
  border: 1px solid ${darkest};
  border-radius: 5px 0 0 5px;
  opacity: 0;

  @media (max-width: 730px) {
    margin-top: -20px;
  }
`;

const Part = styled.div`
  color: #fff;
  background: ${props => (props.selected ? light : middle)};
  padding: 10px 20px;
  border-bottom: 1px solid ${darkest};
  cursor: pointer;
  text-transform: uppercase;
  font-size: 14px;
  transition: background 0.3s ease;
  &:last-child {
    border-bottom: 0;
  }

  @media (max-width: 730px) {
    font-size: 12px;
    padding: 5px 12px;
  }
`;

@observer
class MonthPicker extends React.Component {
  wrapper = React.createRef();

  show = () => {
    anime({
      targets: findDOMNode(this.wrapper.current),
      opacity: [0, 1],
      translateY: ['-50%', '-50%'],
      translateX: [100, 0],
      begin: () => {
        emitter.emit('showHeader');
      }
    });
  };

  setScrollListener = () => {};

  componentDidMount() {
    emitter.on('pageLoaded', this.show);
    this.setScrollListener();
  }

  componentWillUnmount() {
    emitter.off('pageLoaded', this.show);
  }

  render() {
    const { selectedMonth, setSelectedMonth } = UiStore;

    return (
      <Container innerRef={this.wrapper}>
        {months.map(date => (
          <Part
            onClick={() => setSelectedMonth(date)}
            selected={selectedMonth === date}
            key={date}
          >
            {date}
          </Part>
        ))}
      </Container>
    );
  }
}

export default MonthPicker;

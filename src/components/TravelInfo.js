import React from 'react';
import styled from 'styled-components';
import { middle, darkest, light } from '../vars';
import months from '../constants/months';
import UiStore from '../stores/UiStore';
import { observer } from 'mobx-react';
import anime from 'animejs';
import { findDOMNode } from 'react-dom';
import mapInstance from '../mapInstance';

const Wrapper = styled.div`
  position: fixed;
  z-index: 1000;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.6);
`;

const Modal = styled.div`
  width: 600px;
  background: #fff;
  color: #222;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-60%, -50%);
  border-radius: 4px;
  box-shadow: 3px 0 3px rgba(0, 0, 0, 0.65);
  opacity: 0;
  transform: scale(0);
  h3 {
    border-bottom: 1px solid #ddd;
    padding: 20px;
  }
`;

const Inner = styled.div`
  padding: 20px;
`;

const Part = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;

  b {
    font-size: 14px;
    color: #3f3d3a;
    text-transform: uppercase;
    font-family: ScandinavianNew-Black;
  }
`;

class TravelInfo extends React.Component {
  modal = React.createRef();

  getPart() {
    return (
      <Part>
        <div>
          <b>TUR-RETUR</b>
          <div>ARN - CDG CDG - ARN</div>
        </div>
        <div>
          <b>Datum</b>
          <div>20 Okt - 01 Jan</div>
        </div>
        <div>
          <b>Resenärer</b>
          <div>1 Ungdom</div>
        </div>
      </Part>
    );
  }

  componentDidMount() {
    anime({
      targets: findDOMNode(this.modal.current),
      opacity: [0, 1],
      translateY: ['-60%', '-50%'],
      translateX: ['-50%', '-50%']
    });
  }

  render() {
    const { destination } = this.props;

    return (
      <Wrapper onClick={UiStore.toggleModdal}>
        <Modal innerRef={this.modal}>
          <h3>Flyg</h3>
          <Inner>
            {this.getPart()}
            {this.getPart()}
            {this.getPart()}
          </Inner>
        </Modal>
      </Wrapper>
    );
  }
}

export default TravelInfo;

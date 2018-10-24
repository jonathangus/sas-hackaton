import React from 'react';
import styled from 'styled-components';
import UiStore from '../stores/UiStore';
import { darkest } from '../vars';

const Wrapper = styled.div`
  color: white;
  position: fixed;
  left: 10px;
  bottom: 10px;
  cursor: pointer;
  font-weight: bold;
  font-family: 'ScandinavianNew', 'Helvetica', sans-serif;
  border-radius: 4px;
  padding: 5px;
  text-align: right;
  background: ${darkest};

  @media (max-width: 730px) {
    bottom: auto;
    top: 5px;
  }
`;

class RandomDestination extends React.Component {
  render() {
    return <Wrapper onClick={UiStore.randomDestination}>Random</Wrapper>;
  }
}

export default RandomDestination;

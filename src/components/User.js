import React from 'react';
import styled from 'styled-components';
import { lighest, darkest } from '../vars';
import UiStore from '../stores/UiStore';

const Wrapper = styled.div`
  position: fixed;
  right: 10px;
  top: 10px;
  z-index: 50;
  border-radius: 4px;
  padding: 5px;
  text-align: right;
  background: ${darkest};

  @media (max-width: 730px) {
    font-size: 12px;
    top: 5px;
  }
`;

const Name = styled.div``;

const Points = styled.div``;

class User extends React.Component {
  render() {
    return (
      <Wrapper>
        <Name>Jan Carlzon</Name>
        <Points>EuroBonus poäng: {UiStore.user.points}</Points>
      </Wrapper>
    );
  }
}

export default User;

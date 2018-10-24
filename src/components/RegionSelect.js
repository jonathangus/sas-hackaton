import React from 'react';
import styled from 'styled-components';
import { lighest, darkest } from '../vars';
import debounce from 'lodash/debounce';
import UiStore from '../stores/UiStore';
import regions from '../constants/regions';

const Parent = styled.div`
  display: flex;
  background: ${darkest};
  border-radius: 4px;

  @media (max-width: 730px) {
    transform: translateY(10px);
  }
`;
const Reg = styled.div`
  padding: 10px;
  cursor: pointer;
  &:hover {
    color: ${lighest};
  }
`;

class RegionSelect extends React.Component {
  render() {
    return (
      <Parent>
        {regions.map(region => (
          <Reg
            onClick={() => UiStore.focusRegion(region.airports)}
            key={region.key}
          >
            {region.name}
          </Reg>
        ))}
      </Parent>
    );
  }
}

export default RegionSelect;

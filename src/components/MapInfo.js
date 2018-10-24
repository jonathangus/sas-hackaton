import React from 'react';
import UiStore from '../stores/UiStore';
import { observer } from 'mobx-react';
import SelectedDestination from './SelectedDestination';

@observer
class MapInfo extends React.Component {
  render() {
    const { selectedDestination } = UiStore;

    return (
      <React.Fragment>
        <SelectedDestination destination={selectedDestination} />
      </React.Fragment>
    );
  }
}

export default MapInfo;

import React from 'react';
import withGlobalStyle from '../src/hocs/withGlobalStyle';
import Seo from '../src/components/Seo';
import MainPage from '../src/components/MainPage';

const Index = () => (
  <React.Fragment>
    <Seo title="Sas hackaton" description="desc" />
    <MainPage />
  </React.Fragment>
);

export default withGlobalStyle(Index);

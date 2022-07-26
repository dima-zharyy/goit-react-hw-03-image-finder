import React from 'react';
import { SpinnerContainer } from './Loader.styled';
import { Bars } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <SpinnerContainer>
      <Bars color="#3f51b5" height="40" width="40" />
    </SpinnerContainer>
  );
};

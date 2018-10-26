import * as React from 'react';
import { CircularProgress } from '@material-ui/core';
import styled from 'styled-components';

const LoadingStyles = styled.div`
  z-index: 1000;
  display: flex;
  position: absolute;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  .loader {
    color: ${props => props.theme.colors.mainColor};
  }
`;

const FullScreen = () => (
  <LoadingStyles>
    <CircularProgress className="loader"/>
  </LoadingStyles>
);

export default FullScreen;

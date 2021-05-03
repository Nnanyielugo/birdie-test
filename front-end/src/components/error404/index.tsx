import * as React from 'react';
import styled from 'styled-components';

import Logo from './Logo';
import Title from './Title';
import SubTitle from './SubTitle';
const LogoUrl = require('../../assets/images/logo-birdie.svg');

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  background-color: #fff;
`;

export const Error404: React.FC = (): JSX.Element => {
  return (
    <AppContainer>
      <Logo src={LogoUrl} />
      <Title>404: Not Found.</Title>
      <SubTitle>The page you're looking for does not exist.</SubTitle>
    </AppContainer>
  );
};

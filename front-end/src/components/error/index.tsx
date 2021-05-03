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

export const ErrorComponent: React.FC = (): JSX.Element => {
  return (
    <AppContainer>
      <Logo src={LogoUrl} />
      <Title>Oops, there was an error.</Title>
      <SubTitle>
        We&apos;re having problems fetching the resource you want. Please try
        again.
      </SubTitle>
    </AppContainer>
  );
};

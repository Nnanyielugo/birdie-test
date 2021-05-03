import * as React from 'react';
import styled from 'styled-components';
import Container from './Container';
import Item from './Item';

const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const loader: React.FC = (): JSX.Element => {
  return (
    <Loader>
      <Container>
        <Item />
        <Item />
      </Container>
    </Loader>
  );
};

export default loader;

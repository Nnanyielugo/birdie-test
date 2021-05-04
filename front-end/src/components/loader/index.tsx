import * as React from 'react';
import styled from 'styled-components';
import Container from '@App/components/loader/Container';
import Item from '@App/components/loader/Item';

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

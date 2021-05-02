import * as React from 'react';

import Section from './Section';
import Nav from './Nav';
import Item from './Item';

export const Navigation: React.FC = (): JSX.Element => {
  return (
    <Section>
      <Nav>
        <Item>Link 1</Item>
        <Item>Link 2</Item>
      </Nav>
    </Section>
  );
};

import * as React from 'react';

import Section from './Section';
import Nav from '@App/components/navigation/Nav';
import Link from '@App/components/navigation/CustomLink';

export const Navigation: React.FC = (): JSX.Element => {
  return (
    <Section>
      <Nav>
        <Link to="/" label="Home" activeOnlyWhenExact={true} />
        <Link
          to="/mood-observation"
          label="Mood Observation"
          activeOnlyWhenExact={false}
        />
      </Nav>
    </Section>
  );
};

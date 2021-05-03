import * as React from 'react';
// import styled from 'styled-components';
import { Events } from '@App/store/interfaces';
import Section from './Section';
import List from './List';
import ListItem from './ListItem';
// import Item from './Item';
// import TimeCard from './TimeCard';

interface TimelineProps {
  events: Events[];
}

export const Moods: React.FC<TimelineProps> = ({ events }): JSX.Element => {
  return (
    <Section>
      <List>
        {events.map((event: Events) => {
          return <ListItem item={event} key={event.payload.id} />;
        })}
      </List>
    </Section>
  );
};

import * as React from 'react';
import format from 'date-fns/format';
import { Events } from '@App/store/interfaces';
import Item from './Item';
import Card from './Card';
import Time from './Time';

interface ItemProps {
  item: Events;
}

const ListItem: React.FC<ItemProps> = ({ item }): JSX.Element => {
  const dateObj = new Date(item.payload.timestamp);
  return (
    <Item>
      <Card>
        <Time>{format(dateObj, 'dd-MMM-yyyy: hh:mm aaa')}</Time>
        {item.payload.event_type}
      </Card>
    </Item>
  );
};

export default ListItem;

import * as React from 'react';
import format from 'date-fns/format';
import { Events } from '@App/store/interfaces';
import Item from '@App/components/events/Item';
import Card from '@App/components/events/Card';
import Time from '@App/components/events/Time';

interface ItemProps {
  item: Events;
}

function formatEventType(word: string): string {
  let strArr = word.split('_');
  let firstWord = strArr[0];
  const firstLetterUpper = firstWord[0].toUpperCase();
  firstWord = firstLetterUpper + firstWord.slice(1);
  strArr.splice(0, 1, firstWord);
  return strArr.join(' ');
}

const ListItem: React.FC<ItemProps> = ({ item: { payload } }): JSX.Element => {
  const dateObj = new Date(payload.timestamp);
  const formattedEventType = formatEventType(payload.event_type);

  return (
    <Item>
      <Card>
        <Time>{format(dateObj, 'dd-MMM-yyyy: hh:mm aaa')}</Time>
        {formattedEventType}
      </Card>
    </Item>
  );
};

export default ListItem;

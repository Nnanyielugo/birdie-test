import * as React from 'react';
import format from 'date-fns/format';
import { Moods } from '@App/store/interfaces';
import Item from '@App/components/moods/Item';
import Card from '@App/components/moods/Card';
import Time from '@App/components/moods/Time';

interface ItemProps {
  item: Moods;
}

function formatMoodType(word: string): string {
  const firstLetterUpper = word[0].toUpperCase();
  return firstLetterUpper + word.slice(1);
}

const ListItem: React.FC<ItemProps> = ({ item: { payload } }): JSX.Element => {
  const dateObj = new Date(payload.timestamp);
  const formattedEventType = formatMoodType(payload.mood);

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

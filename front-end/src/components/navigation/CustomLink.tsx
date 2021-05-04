import * as React from 'react';
import { useRouteMatch } from 'react-router-dom';
import Item from '@App/components/navigation/Item';

interface LinkProps {
  to: string;
  label: string;
  activeOnlyWhenExact?: boolean;
}

const customLink: React.FC<LinkProps> = (props: LinkProps): JSX.Element => {
  const match = useRouteMatch({
    path: props.to,
    exact: props.activeOnlyWhenExact,
  });
  return (
    <Item className={match ? 'active' : ''} to={props.to}>
      {props.label}
    </Item>
  );
};

export default customLink;

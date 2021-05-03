import * as React from 'react';
import { RootState } from '@App/store/reducers';
import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';

import { Events, AppActions } from '@App/store/interfaces';
import Section from './Section';
import List from './List';
import ListItem from './ListItem';
import Loader from '@App/components/loader';

interface AppProps {
  events: Events[];
  fetchEvents: () => void;
}

interface DispatchReturn {
  fetchEvents: () => void;
}

class EventsClass extends React.Component<AppProps> {
  public constructor(props: AppProps) {
    super(props);
  }

  async handleFetchEvents(): Promise<void> {
    await this.props.fetchEvents();
  }

  componentDidMount() {
    this.handleFetchEvents();
  }

  public render() {
    const { events } = this.props;
    return (
      <Section>
        {!Boolean(events.length) && <Loader />}
        <List>
          {this.props.events.map((event: Events) => {
            return <ListItem item={event} key={event.payload.id} />;
          })}
        </List>
      </Section>
    );
  }
}

const mapStateToProps = (state: RootState, ownProps: object) => {
  const events = state.events.events;
  return { events };
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchReturn => ({
  fetchEvents: () => dispatch({ type: AppActions.FetchEventsRequested }),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventsClass);

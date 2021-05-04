import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';

import Pagination from '../pagination';
import {
  Events,
  EventsState,
  AppActions,
  RootState,
} from '@App/store/interfaces';
import Section from '@App/components/events/Section';
import List from '@App/components/events/List';
import ListItem from '@App/components/events/ListItem';
import Loader from '@App/components/loader';
import { ErrorComponent } from '@App/components/error';

interface AppProps {
  events: EventsState;
  fetchEvents: () => void;
  changeOffSet: (offset: number) => void;
}

interface DispatchReturn {
  fetchEvents: () => void;
  changeOffSet: (offset: number) => void;
}

class EventsClass extends React.Component<AppProps> {
  public constructor(props: AppProps) {
    super(props);
  }

  handleFetchEvents(): void {
    this.props.fetchEvents();
  }

  componentDidMount() {
    this.props.changeOffSet(0);
    this.handleFetchEvents();
  }

  componentDidUpdate(prevProps: AppProps) {
    if (prevProps.events.skip !== this.props.events.skip) {
      this.handleFetchEvents();
    }
  }

  public render() {
    const {
      events: { events, limit, total, loading, skip, error },
    } = this.props;

    if (error && error.message) {
      return (
        <Section>
          <ErrorComponent />
        </Section>
      );
    }

    return (
      <Section>
        {loading && <Loader />}

        <Pagination
          totalItems={total}
          limit={limit}
          skip={skip}
          loaded={!loading}
          pageNeighbors={2}
          onPageChanged={(props: { offset: number }) => {
            this.props.changeOffSet(props.offset);
          }}
        />
        {!loading && (
          <List>
            {events.map((event: Events) => {
              return <ListItem item={event} key={event.payload.id} />;
            })}
          </List>
        )}
      </Section>
    );
  }
}

const mapStateToProps = (state: RootState, ownProps: object) => {
  const events = state.events;
  return { events };
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchReturn => ({
  fetchEvents: () => dispatch({ type: AppActions.FetchEventsRequested }),
  changeOffSet: (offset) =>
    dispatch({ type: AppActions.ChangeEventsOffset, payload: { offset } }),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventsClass);

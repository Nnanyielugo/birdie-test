import * as React from 'react';
import { RootState } from '@App/store/reducers';
import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';

import Pagination from '../pagination';
import { Events, EventsState, AppActions } from '@App/store/interfaces';
import Section from './Section';
import List from './List';
import ListItem from './ListItem';
import Loader from '@App/components/loader';

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
    this.handleFetchEvents();
  }

  componentDidUpdate(prevProps: AppProps) {
    // tslint:disable-next-line:no-console
    console.log(
      'did update, props',
      prevProps.events.skip,
      this.props.events.skip
    );
    if (prevProps.events.skip !== this.props.events.skip) {
      this.handleFetchEvents();
    }
  }

  public render() {
    const {
      events: { events, limit, total, loading, skip },
    } = this.props;
    // TODO: ERROR HANDLING
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
            // tslint:disable-next-line:no-console
            console.log('paginator props', props);
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

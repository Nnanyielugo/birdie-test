import * as React from 'react';
import { RootState } from '@App/store/reducers';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { Events, AppActions } from '@App/store/interfaces';
import Section from './Section';
import List from './List';
import ListItem from './ListItem';

interface AppProps {
  events: Events[];
  fetchEvents: () => void;
}

interface DispatchReturn {
  fetchEvents: () => void;
}

interface AppState {
  isLoading: boolean;
}

class EventsClass extends React.Component<AppProps, AppState> {
  public constructor(props: AppProps) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  async handleFetchEvents(): Promise<void> {
    this.setState({ isLoading: true });
    await this.props.fetchEvents();
    this.setState({ isLoading: false });
  }

  componentDidMount() {
    this.handleFetchEvents();
  }

  public render() {
    return (
      <Section>
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

const mapDispatchToProps = (dispatch: Dispatch<RootState>): DispatchReturn => ({
  fetchEvents: () => dispatch({ type: AppActions.FetchEventsRequested }),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventsClass);

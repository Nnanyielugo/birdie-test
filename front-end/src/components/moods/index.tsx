import * as React from 'react';
import { RootState } from '@App/store/reducers';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { Moods, AppActions } from '@App/store/interfaces';
import Section from './Section';
import List from './List';
import ListItem from './ListItem';

interface AppProps {
  moods: Moods[];
  fetchMoods: () => void;
}

interface DispatchReturn {
  fetchMoods: () => void;
}

interface AppState {}

class MoodsClass extends React.Component<AppProps, AppState> {
  public constructor(props: AppProps) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchMoods();
  }

  public render() {
    return (
      <Section>
        <List>
          {this.props.moods.map((event: Moods) => {
            return <ListItem item={event} key={event.payload.id} />;
          })}
        </List>
      </Section>
    );
  }
}

const mapStateToProps = (state: RootState, ownProps: object) => {
  const moods = state.moods.moods;
  return { moods };
};

const mapDispatchToProps = (dispatch: Dispatch<RootState>): DispatchReturn => ({
  fetchMoods: () => dispatch({ type: AppActions.FetchMoodsRequested }),
});

export default connect(mapStateToProps, mapDispatchToProps)(MoodsClass);

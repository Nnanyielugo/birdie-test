import * as React from 'react';
import { RootState } from '@App/store/reducers';
import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';

import { Moods, AppActions } from '@App/store/interfaces';
import Section from './Section';
import List from './List';
import ListItem from './ListItem';
import Loader from '@App/components/loader';

interface AppProps {
  moods: Moods[];
  fetchMoods: () => void;
}

interface DispatchReturn {
  fetchMoods: () => void;
}
class MoodsClass extends React.Component<AppProps> {
  public constructor(props: AppProps) {
    super(props);
  }

  async handleFetchMoods(): Promise<void> {
    this.setState({ isLoading: true });
    await this.props.fetchMoods();
    this.setState({ isLoading: false });
  }

  componentDidMount() {
    this.handleFetchMoods();
  }

  public render() {
    const { moods } = this.props;
    return (
      <Section>
        {!Boolean(moods.length) && <Loader />}
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

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchReturn => ({
  fetchMoods: () => dispatch({ type: AppActions.FetchMoodsRequested }),
});

export default connect(mapStateToProps, mapDispatchToProps)(MoodsClass);

import * as React from 'react';
import { RootState } from '@App/store/reducers';
import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';

import Pagination from '../pagination';
import { Moods, MoodsState, AppActions } from '@App/store/interfaces';
import Section from './Section';
import List from './List';
import ListItem from './ListItem';
import Loader from '@App/components/loader';

interface AppProps {
  moods: MoodsState;
  fetchMoods: () => void;
  changeOffSet: (offset: number) => void;
}

interface DispatchReturn {
  fetchMoods: () => void;
  changeOffSet: (offset: number) => void;
}
class MoodsClass extends React.Component<AppProps> {
  public constructor(props: AppProps) {
    super(props);
  }

  handleFetchMoods(): void {
    this.props.fetchMoods();
  }

  componentDidMount() {
    this.handleFetchMoods();
  }

  componentDidUpdate(prevProps: AppProps) {
    // tslint:disable-next-line:no-console
    if (prevProps.moods.skip !== this.props.moods.skip) {
      this.handleFetchMoods();
    }
  }

  public render() {
    const {
      moods: { moods, limit, total, loading, skip },
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
            {moods.map((event: Moods) => {
              return <ListItem item={event} key={event.payload.id} />;
            })}
          </List>
        )}
      </Section>
    );
  }
}

const mapStateToProps = (state: RootState, ownProps: object) => {
  const moods = state.moods;
  return { moods };
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchReturn => ({
  fetchMoods: () => dispatch({ type: AppActions.FetchMoodsRequested }),
  changeOffSet: (offset) =>
    dispatch({ type: AppActions.ChangeMoodsOffset, payload: { offset } }),
});

export default connect(mapStateToProps, mapDispatchToProps)(MoodsClass);

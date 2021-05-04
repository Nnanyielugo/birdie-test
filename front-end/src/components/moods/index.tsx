import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';

import Pagination from '@App/components/pagination';
import {
  Moods,
  MoodsState,
  AppActions,
  RootState,
} from '@App/store/interfaces';
import Section from '@App/components/moods/Section';
import List from '@App/components/moods/List';
import ListItem from '@App/components/moods/ListItem';
import Loader from '@App/components/loader';
import { ErrorComponent } from '@App/components/error';

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
    this.props.changeOffSet(0);
    this.handleFetchMoods();
  }

  componentDidUpdate(prevProps: AppProps) {
    if (prevProps.moods.skip !== this.props.moods.skip) {
      this.handleFetchMoods();
    }
  }

  public render() {
    const {
      moods: { moods, limit, total, loading, skip, error },
    } = this.props;

    if (error && error.message) {
      return <ErrorComponent />;
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

import * as qs from 'qs';
import axios from 'axios';
import { put, takeEvery, call, select, StrictEffect } from 'redux-saga/effects';
import { AppActions, MoodsReturn, Paginators } from '../interfaces';
import { RootState } from '../reducers';

const getPaginators = (state: RootState): Paginators => ({
  limit: state.moods.limit,
  skip: state.moods.skip,
});

async function fetchMoods(paginators: Paginators): Promise<MoodsReturn> {
  try {
    const apiEndpoint =
      process.env.NODE_ENV === 'development'
        ? process.env.REACT_APP_apiEndpoint
        : process.env.REACT_APP_productionEndpoint;
    const response = await axios.get(
      `${apiEndpoint}/api/events/moods?${qs.stringify(paginators)}`
    );
    if (response.status >= 200 && response.status <= 400) {
      return response.data;
    } else {
      throw response.data;
    }
  } catch (err) {
    throw err.response.data;
  }
}

export function* initFetchMoods(): Generator<StrictEffect, void, Paginators> {
  try {
    const paginators: Paginators = yield select(getPaginators);
    const moods = yield call(fetchMoods, paginators);
    yield put({ type: AppActions.FetchMoodsSucceeded, payload: moods });
  } catch (err) {
    yield put({ type: AppActions.FetchMoodsFailed, payload: err });
  }
}

export function* watchInitFetchMoods(): Generator {
  yield takeEvery(AppActions.FetchMoodsRequested, initFetchMoods);
}

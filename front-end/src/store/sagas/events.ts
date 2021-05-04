import * as qs from 'qs';
import axios from 'axios';
import { put, takeEvery, call, select, StrictEffect } from 'redux-saga/effects';
import {
  AppActions,
  EventsReturn,
  Paginators,
  RootState,
} from '@App/store/interfaces';

export const getPaginators = (state: RootState): Paginators => ({
  limit: state.events.limit,
  skip: state.events.skip,
});

export async function fetchEvents(
  paginators: Paginators
): Promise<EventsReturn> {
  try {
    const apiEndpoint =
      process.env.NODE_ENV === 'development'
        ? process.env.REACT_APP_apiEndpoint
        : process.env.REACT_APP_productionEndpoint;
    const response = await axios.get(
      `${apiEndpoint}/api/events?${qs.stringify(paginators)}`
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

export function* initFetchEvents(): Generator<StrictEffect, void, Paginators> {
  try {
    const paginators: Paginators = yield select(getPaginators);
    const events = yield call(fetchEvents, paginators);
    yield put({ type: AppActions.FetchEventsSucceeded, payload: events });
  } catch (err) {
    yield put({ type: AppActions.FetchEventsFailed, payload: err });
  }
}

export function* watchInitFetchEvents(): Generator {
  yield takeEvery(AppActions.FetchEventsRequested, initFetchEvents);
}

import * as config from 'config';
import axios from 'axios';
import { put, takeEvery, call } from 'redux-saga/effects';
import { AppActions, EventsReturn } from '../interfaces';

async function fetchEvents(): Promise<EventsReturn> {
  try {
    const apiEndpoint = config.get('apiEndpoint');
    const response = await axios.get(`${apiEndpoint}/api/events`);
    if (response.status >= 200 && response.status <= 400) {
      return response.data;
    } else {
      throw response.data;
    }
  } catch (err) {
    throw err;
  }
}

async function* initFetchEvents(): any {
  try {
    const events = yield call(fetchEvents);
    yield put({ type: AppActions.FetchEventsSucceeded, events });
  } catch (err) {
    yield put({ type: AppActions.FetchEventsFailed, err });
  }
}

export function* watchInitFetchEvents(): Generator {
  yield takeEvery(AppActions.FetchEventsRequested, initFetchEvents);
}

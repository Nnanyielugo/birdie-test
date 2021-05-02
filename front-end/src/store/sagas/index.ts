import { all } from 'redux-saga/effects';
import { watchInitFetchEvents } from './events';

function* initSaga() {
  yield all([watchInitFetchEvents()]);
}

export default initSaga;

import { all } from 'redux-saga/effects';
import { watchInitFetchEvents } from './events';
import { watchInitFetchMoods } from './moods';

function* initSaga() {
  yield all([watchInitFetchEvents(), watchInitFetchMoods()]);
}

export default initSaga;

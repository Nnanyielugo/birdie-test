import { all } from 'redux-saga/effects';
import { watchInitFetchEvents } from '@App/store/sagas/events';
import { watchInitFetchMoods } from '@App/store/sagas/moods';

function* initSaga() {
  yield all([watchInitFetchEvents(), watchInitFetchMoods()]);
}

export default initSaga;

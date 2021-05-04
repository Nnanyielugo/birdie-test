import { combineReducers } from 'redux';
import { eventsReducer } from '@App/store/reducers/events';
import { moodsReducer } from '@App/store/reducers/moods';
import { RootState } from '@App/store/interfaces';

export const rootReducer = combineReducers<RootState>({
  events: eventsReducer,
  moods: moodsReducer,
});

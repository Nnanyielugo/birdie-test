import { combineReducers } from 'redux';
import { eventsReducer } from './events';
import { moodsReducer } from './moods';
import { EventsState, MoodsState } from '../interfaces';

export type RootState = Readonly<{
  events: EventsState;
  moods: MoodsState;
}>;

export const rootReducer = combineReducers<RootState>({
  events: eventsReducer,
  moods: moodsReducer,
});

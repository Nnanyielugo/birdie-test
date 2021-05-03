import { combineReducers } from 'redux';
import { eventsReducer } from './events';
import { moodsReducer } from './moods';
import { EventsState, MoodsState } from '../interfaces';

type Root = {
  events: EventsState;
  moods: MoodsState;
};

export type RootState = Readonly<Root>;

export const rootReducer = combineReducers<RootState>({
  events: eventsReducer,
  moods: moodsReducer,
});

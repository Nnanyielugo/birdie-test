import { combineReducers } from 'redux';
import { eventsReducer } from './events';
import { EventsState } from '../interfaces';

export type RootState = Readonly<{
  events: EventsState;
}>;

export const rootReducer = combineReducers<RootState>({
  events: eventsReducer,
});

import { combineReducers } from 'redux';
import { eventsReducer } from './events';

export type RootState = Readonly<{}>;

export const rootReducer = combineReducers<RootState>({
  events: eventsReducer,
});

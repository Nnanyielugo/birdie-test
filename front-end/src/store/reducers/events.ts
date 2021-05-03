import { EventsState, EventsAction, AppActions } from '../interfaces';
import { Reducer } from 'redux';

const initialState: EventsState = {
  limit: 100,
  skip: 0,
  error: null,
  events: [],
};

export const eventsReducer: Reducer<EventsState> = (
  state = initialState,
  action: EventsAction
): EventsState => {
  switch (action.type) {
    case AppActions.FetchEventsSucceeded:
      return {
        ...state,
        ...action.payload,
      };
    case AppActions.FetchEventsFailed:
      return {
        ...state,
        error: {
          message: action.payload.error && action.payload.error.message,
        },
      };
    default:
      return state;
  }
};

import { EventsState, EventsAction, AppActions } from '../interfaces';
import { Reducer } from 'redux';

const initialState: EventsState = {
  events: [],
  limit: 0,
  skip: 0,
  isFetching: false,
  error: null,
};

export const eventsReducer: Reducer<EventsState> = (
  state = initialState,
  action: EventsAction
): EventsState => {
  switch (action.type) {
    case AppActions.FetchEventsSucceeded:
      return {
        ...state,
        ...action.payload.events,
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

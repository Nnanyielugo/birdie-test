import { EventsState, EventsAction, AppActions } from '@App/store/interfaces';
import { Reducer } from 'redux';

const initialState: EventsState = {
  limit: 100,
  skip: 0,
  error: null,
  events: [],
  total: 0,
  pages: 0,
  loading: false,
};

export const eventsReducer: Reducer<EventsState> = (
  state = initialState,
  action: EventsAction
): EventsState => {
  // tslint:disable-next-line:no-console
  switch (action.type) {
    case AppActions.ChangeEventsOffset:
      return {
        ...state,
        skip: action.payload.offset ? action.payload.offset : 0,
      };
    case AppActions.FetchEventsRequested:
      return {
        ...state,
        loading: true,
      };
    case AppActions.FetchEventsSucceeded:
      return {
        ...state,
        ...action.payload,
        loading: false,
      };
    case AppActions.FetchEventsFailed:
      return {
        ...state,
        error: {
          message: action.payload.error && action.payload.error.message,
        },
        loading: false,
      };
    default:
      return state;
  }
};

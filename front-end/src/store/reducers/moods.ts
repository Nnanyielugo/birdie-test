import { MoodsState, MoodsAction, AppActions } from '../interfaces';
import { Reducer } from 'redux';

const initialState: MoodsState = {
  limit: 100,
  skip: 0,
  isFetching: false,
  error: null,
  moods: [],
};

export const moodsReducer: Reducer<MoodsState> = (
  state = initialState,
  action: MoodsAction
): MoodsState => {
  switch (action.type) {
    case AppActions.FetchMoodsSucceeded:
      return {
        ...state,
        ...action.payload,
      };
    case AppActions.FetchMoodsFailed:
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

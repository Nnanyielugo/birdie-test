import { MoodsState, MoodsAction, AppActions } from '@App/store/interfaces';
import { Reducer } from 'redux';

const initialState: MoodsState = {
  limit: 100,
  skip: 0,
  error: null,
  moods: [],
  total: 0,
  pages: 0,
  loading: false,
};

export const moodsReducer: Reducer<MoodsState> = (
  state = initialState,
  action: MoodsAction
): MoodsState => {
  switch (action.type) {
    case AppActions.ChangeMoodsOffset:
      return {
        ...state,
        skip: action.payload.offset ? action.payload.offset : 0,
      };
    case AppActions.FetchMoodsRequested:
      return {
        ...state,
        loading: true,
      };
    case AppActions.FetchMoodsSucceeded:
      return {
        ...state,
        ...action.payload,
        loading: false,
      };
    case AppActions.FetchMoodsFailed:
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

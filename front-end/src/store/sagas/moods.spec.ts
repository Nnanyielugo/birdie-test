import { initFetchMoods, getPaginators, fetchMoods } from './moods';
import { select, call, put } from 'redux-saga/effects';
import { Paginators, MoodsState, AppActions } from '../interfaces';

describe('Mood saga test', () => {
  const generator: Generator = initFetchMoods();
  const paginatorResult: Paginators = { limit: 0, skip: 0 };
  const moods: MoodsState = {
    ...paginatorResult,
    total: 0,
    pages: 0,
    error: null,
    loading: false,
    moods: [
      {
        payload: {
          id: 'fdd52a68-cccc-404d-b054-40e612e26df1',
          visit_id: '5cd753f0-8b66-f8a8-4275-60ef0c0ee1d5',
          mood: 'happy',
          timestamp: new Date('2019-05-12T15:20:15+01:00'),
          event_type: 'mood_observation',
          caregiver_id: '868ffde9-b069-4af5-8835-c4ac4e72e4b5',
          care_recipient_id: 'df50cac5-293c-490d-a06c-ee26796f850d',
        },
      },
    ],
  };

  it('calls select paginators', () => {
    expect(generator.next().value).toEqual(select(getPaginators));
  });

  it('calls api function with pagination result', () => {
    expect(generator.next(paginatorResult).value).toEqual(
      call(fetchMoods, paginatorResult)
    );
  });

  it('triggers state change', () => {
    expect(generator.next(moods).value).toEqual(
      put({ type: AppActions.FetchMoodsSucceeded, payload: moods })
    );
  });
});

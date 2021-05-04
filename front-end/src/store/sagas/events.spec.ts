import { initFetchEvents, getPaginators, fetchEvents } from './events';
import { select, call, put } from 'redux-saga/effects';
import { Paginators, EventsState, AppActions } from '../interfaces';

describe('Events saga test', () => {
  const generator: Generator = initFetchEvents();
  const paginatorResult: Paginators = { limit: 0, skip: 0 };
  const events: EventsState = {
    ...paginatorResult,
    total: 0,
    pages: 0,
    error: null,
    loading: false,
    events: [
      {
        payload: {
          id: 'fdd52a68-cccc-404d-b054-40e612e26df1',
          visit_id: '5cd753f0-8b66-f8a8-4275-60ef0c0ee1d5',
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
      call(fetchEvents, paginatorResult)
    );
  });

  it('triggers state change', () => {
    expect(generator.next(events).value).toEqual(
      put({ type: AppActions.FetchEventsSucceeded, payload: events })
    );
  });
});

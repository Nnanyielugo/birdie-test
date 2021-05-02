export enum AppActions {
  FetchEventsRequested = 'FETCH_EVENTS_REQUESTED',
  FetchEventsSucceeded = 'FETCH_EVENTS_SUCCEEDED',
  FetchEventsFailed = 'FETCH_EVENTS_FAILED',
}

export interface Events {
  payload: {
    id: string;
    visit_id: string;
    timestamp: Date;
    event_type: string;
    caregiver_id: string;
    care_recipient_id: string;
    mood?: string;
  };
}

export interface EventsState {
  limit: number;
  skip: number;
  events: Events[];
  isFetching: boolean;
  error: Error | null;
}

export interface AppState {
  readonly events: EventsState;
}

export interface Error {
  message?: string;
  status?: number;
  name?: string;
}

export interface EventsAction {
  type: AppActions;
  payload: {
    events?: Events[];
    error?: Error;
  };
}

export interface EventsReturn {
  data: {
    events?: Events[];
    limit?: number;
    skip?: number;
    error?: Error;
  };
}

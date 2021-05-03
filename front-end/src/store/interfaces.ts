export enum AppActions {
  FetchEventsRequested = 'FETCH_EVENTS_REQUESTED',
  FetchEventsSucceeded = 'FETCH_EVENTS_SUCCEEDED',
  FetchEventsFailed = 'FETCH_EVENTS_FAILED',
  FetchMoodsRequested = 'FETCH_MOODS_REQUESTED',
  FetchMoodsSucceeded = 'FETCH_MOODS_SUCCEEDED',
  FetchMoodsFailed = 'FETCH_MOODS_FAILED',
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
  error: Error | null;
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

export interface Moods {
  payload: {
    id: string;
    visit_id: string;
    timestamp: Date;
    event_type: string;
    caregiver_id: string;
    care_recipient_id: string;
    mood: string;
  };
}

export interface MoodsState {
  limit: number;
  skip: number;
  moods: Moods[];
  error: Error | null;
}

export interface MoodsAction {
  type: AppActions;
  payload: {
    moods?: Moods[];
    error?: Error;
  };
}

export interface MoodsReturn {
  data: {
    moods?: Moods[];
    limit?: number;
    skip?: number;
    error?: Error;
  };
}

export interface AppState {
  readonly events: EventsState;
  readonly moods: MoodsState;
}

export interface Error {
  message?: string;
  status?: number;
  name?: string;
}

export interface Paginators {
  limit: number;
  skip: number;
}

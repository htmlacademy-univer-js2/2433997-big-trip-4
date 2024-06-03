const DEFAULT_POINT = {
  basePrice: 0,
  dateFrom: null,
  dateTo: null,
  destination: null,
  offers: [],
  type: 'flight',
  isFavorite: false,
};

const FILTER_TYPES = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

const FILTER_NOTIFICATIONS = {
  [FILTER_TYPES.EVERYTHING]: 'Click New Event to create your first point',
  [FILTER_TYPES.FUTURE]: 'There are no future events now',
  [FILTER_TYPES.PRESENT]: 'There are no present events now',
  [FILTER_TYPES.PAST]: 'There are no past events now',
};

const SORT_TYPES = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers',
};

const ON_SORT_TYPES = {
  [SORT_TYPES.DAY]: true,
  [SORT_TYPES.EVENT]: false,
  [SORT_TYPES.TIME]: true,
  [SORT_TYPES.PRICE]: true,
  [SORT_TYPES.OFFERS]: false,
};

const MODES = {
  DEFAULT: 'default',
  EDITING: 'editing',
};

const FORM_TYPES = {
  CREATING: 'CREATING',
  EDITING: 'EDITING',
};

const USER_ACTIONS = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UPDATE_TYPES = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

const BLOCKING_TIME = {
  MIN: 350,
  MAX: 1000,
};

export {
  DEFAULT_POINT,
  FILTER_TYPES,
  MODES,
  SORT_TYPES,
  ON_SORT_TYPES,
  USER_ACTIONS,
  UPDATE_TYPES,
  FORM_TYPES,
  BLOCKING_TIME,
  FILTER_NOTIFICATIONS,
};

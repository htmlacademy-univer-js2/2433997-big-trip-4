const DESTINATION_COUNT = 5;
const OFFER_COUNT = 6;
const POINT_COUNT = 10;

const FILTER_TYPES = {
  EVERYTHING: 'everything',
  FUTURE: 'Future',
  PRESENT: 'Present',
  PAST: 'Past',
};

const TYPES = [
  'taxi',
  'bus',
  'train',
  'ship',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant',
];

const DEFAULT_TYPE = 'flight';

const BLANK_POINT = {
  basePrice: 0,
  dateFrom: null,
  dateTo: null,
  isFavorite: false,
  destination: null,
  offers: [],
  type: DEFAULT_TYPE,
};

const MODE = {
  DEFAULT: 'default',
  EDITING: 'editing',
};

const SORT_TYPE = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers',
};

const ENABLED_SORT_TYPE = {
  [SORT_TYPE.DAY]: true,
  [SORT_TYPE.EVENT]: false,
  [SORT_TYPE.TIME]: true,
  [SORT_TYPE.PRICE]: true,
  [SORT_TYPE.OFFERS]: false,
};

export {
  DESTINATION_COUNT,
  TYPES,
  OFFER_COUNT,
  POINT_COUNT,
  BLANK_POINT,
  FILTER_TYPES,
  MODE,
  SORT_TYPE,
  ENABLED_SORT_TYPE,
};

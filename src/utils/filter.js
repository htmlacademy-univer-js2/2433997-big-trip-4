import { FILTER_TYPES } from '../const.js';
import { futurePointFiltering, presentPointFiltering, pastPointFiltering } from '../utils/point.js';

const filteredTypes = {
  [FILTER_TYPES.EVERYTHING]: (points) => [...points],
  [FILTER_TYPES.FUTURE]: (points) => points.filter((point) => futurePointFiltering(point)),
  [FILTER_TYPES.PRESENT]: (points) => points.filter((point) => presentPointFiltering(point)),
  [FILTER_TYPES.PAST]: (points) => points.filter((point) => pastPointFiltering(point)),
};

export { filteredTypes };

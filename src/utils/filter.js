import { FILTER_TYPES } from '../const.js';
import { isPointFuture, isPointPresent, isPointPast } from '../utils/common.js';

const filter = {
  [FILTER_TYPES.EVERYTHING]: (points) => [...points],
  [FILTER_TYPES.FUTURE]: (points) => points.filter((point) => isPointFuture(point)),
  [FILTER_TYPES.PRESENT]: (points) => points.filter((point) => isPointPresent(point)),
  [FILTER_TYPES.PAST]: (points) => points.filter((point) => isPointPast(point)),
};

export { filter };

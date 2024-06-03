import { SORT_TYPES } from '../const.js';
import {
  getPointsDateDifference,
  getPointsDurationDifference,
  getPointsPriceDifference,
} from '../utils/point.js';

const sortedTypes = {
  [SORT_TYPES.DAY]: (points) => points.sort(getPointsDateDifference),
  [SORT_TYPES.PRICE]: (points) => points.sort(getPointsPriceDifference),
  [SORT_TYPES.TIME]: (points) => points.sort(getPointsDurationDifference),
  [SORT_TYPES.EVENT]: () => {
    throw new Error(`Sort by ${SORT_TYPES.EVENT} is not implemented`);
  },
  [SORT_TYPES.OFFERS]: () => {
    throw new Error(`Sort by ${SORT_TYPES.OFFERS} is not implemented`);
  },
};

export { sortedTypes };

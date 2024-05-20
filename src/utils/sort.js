import { SORT_TYPE } from '../const.js';
import {
  getPointsDateDifference,
  getPointsDurationDifference,
  getPointsPriceDifference,
} from '../utils/point.js';

const sort = {
  [SORT_TYPE.DAY]: (points) => points.sort(getPointsDateDifference),
  [SORT_TYPE.PRICE]: (points) => points.sort(getPointsPriceDifference),
  [SORT_TYPE.TIME]: (points) => points.sort(getPointsDurationDifference),
  [SORT_TYPE.EVENT]: () => {
    throw new Error(`Sort by ${SORT_TYPE.EVENT} is not implemented`);
  },
  [SORT_TYPE.OFFERS]: () => {
    throw new Error(`Sort by ${SORT_TYPE.OFFERS} is not implemented`);
  },
};

export { sort };

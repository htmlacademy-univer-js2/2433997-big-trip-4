import { getRandomInteger } from '../utils/common.js';
import { Duration } from './const.js';
import dayjs from 'dayjs';

let date = dayjs().subtract(getRandomInteger(0, Duration.DAY)).toDate();

function getDate({ next }) {
  const minGap = getRandomInteger(0, Duration.MIN);
  const hourGap = getRandomInteger(0, Duration.HOUR);
  const dayGap = getRandomInteger(0, Duration.DAY);

  if (next) {
    date = dayjs(date).add(minGap, 'minute').add(hourGap, 'hour').add(dayGap, 'day').toDate();
  }
  return date;
}

export { getDate };

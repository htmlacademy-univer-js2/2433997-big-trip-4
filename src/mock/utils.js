import { Duration } from './const.js';
import dayjs from 'dayjs';

function getRandomValue(items) {
  return items[getRandomInteger(0, items.length - 1)];
}

function getRandomInteger(a = 0, b = 1) {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
}

let date = dayjs().subtract(getRandomInteger(0, Duration.DAY)).toDate();

function getDate({ next }) {
  const minGap = getRandomInteger(0, Duration.MIN);
  const hourGap = getRandomInteger(0, Duration.HOUR);
  const dayGap = getRandomInteger(0, Duration.DAY);

  if (next) {
    date = dayjs(date)
      .add(minGap, 'minute')
      .add(hourGap, 'minute')
      .add(dayGap, 'minute')
      .toDate();
  }
  return date;
}

export { getRandomInteger, getRandomValue, getDate };

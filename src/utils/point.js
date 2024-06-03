import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import { TIME_DIVISION } from './const.js';

dayjs.extend(duration);
dayjs.extend(relativeTime);

function formatStringToDateTime(date) {
  return dayjs(date).format('DD/MM/YY HH:mm');
}

function formatStringToShortDate(date) {
  return dayjs(date).format('MMM DD');
}

function formatStringToTime(date) {
  return dayjs(date).format('HH:mm');
}

function capitalize(string) {
  return `${string[0].toUpperCase()}${string.slice(1)}`;
}

function getPointDuration(dateFrom, dateTo) {
  const timeDiff = dayjs(dateTo).diff(dayjs(dateFrom));
  const totalDays = dayjs.duration(timeDiff).days() + dayjs.duration(timeDiff).years() * 365;
  const totalHours = dayjs.duration(timeDiff).hours();
  const totalMinutes = dayjs.duration(timeDiff).minutes();

  let pointDuration = 0;

  switch (true) {
    case timeDiff >= TIME_DIVISION.MSEC_IN_DAY:
      pointDuration = dayjs
        .duration({ days: totalDays, hours: totalHours, minutes: totalMinutes })
        .format('DD[D] HH[H] mm[M]');
      break;

    case timeDiff >= TIME_DIVISION.MSEC_IN_HOUR:
      pointDuration = dayjs.duration(timeDiff).format('HH[H] mm[M]');
      break;

    case timeDiff < TIME_DIVISION.MSEC_IN_HOUR:
      pointDuration = dayjs.duration(timeDiff).format('mm[M]');
      break;
  }

  return pointDuration;
}

function futurePointFiltering(point) {
  return dayjs().isBefore(point.dateFrom);
}

function presentPointFiltering(point) {
  return dayjs().isAfter(point.dateFrom) && dayjs().isBefore(point.dateTo);
}

function pastPointFiltering(point) {
  return dayjs().isAfter(point.dateTo);
}

function getPointsDateDifference(pointA, pointB) {
  return new Date(pointA.dateFrom) - new Date(pointB.dateFrom);
}

function getPointsPriceDifference(pointA, pointB) {
  return pointB.basePrice - pointA.basePrice;
}

function getPointsDurationDifference(pointA, pointB) {
  const durationA = new Date(pointA.dateTo) - new Date(pointA.dateFrom);
  const durationB = new Date(pointB.dateTo) - new Date(pointB.dateFrom);

  return durationB - durationA;
}

function majorDifferenceTest(pointA, pointB) {
  return (
    pointA.dateFrom !== pointB.dateFrom ||
    pointA.basePrice !== pointB.basePrice ||
    getPointDuration(pointA.dateFrom, pointA.dateTo) !==
      getPointDuration(pointB.dateFrom, pointB.dateTo)
  );
}

export {
  formatStringToDateTime,
  formatStringToShortDate,
  formatStringToTime,
  capitalize,
  getPointDuration,
  getPointsDateDifference,
  getPointsPriceDifference,
  getPointsDurationDifference,
  majorDifferenceTest,
  futurePointFiltering,
  presentPointFiltering,
  pastPointFiltering,
};
